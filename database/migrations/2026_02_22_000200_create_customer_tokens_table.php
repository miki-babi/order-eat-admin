<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_tokens', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('token', 120)->unique();
            $table->timestamp('first_seen_at')->nullable();
            $table->timestamp('last_seen_at')->nullable();
            $table->string('last_seen_channel', 30)->nullable();
            $table->string('last_seen_user_agent', 1024)->nullable();
            $table->string('last_seen_ip', 45)->nullable();
            $table->timestamps();
        });

        $this->seedCustomerTokens();
        $this->dropIdentityTokenColumnIfExists();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('customers', 'identity_token')) {
            Schema::table('customers', function (Blueprint $table): void {
                $table->string('identity_token', 80)->nullable()->after('id');
            });
        }

        DB::table('customers')
            ->select('id')
            ->orderBy('id')
            ->chunkById(200, function (Collection $customers): void {
                foreach ($customers as $customer) {
                    $token = DB::table('customer_tokens')
                        ->where('customer_id', $customer->id)
                        ->orderBy('id')
                        ->value('token');

                    DB::table('customers')
                        ->where('id', $customer->id)
                        ->update([
                            'identity_token' => is_string($token) && trim($token) !== ''
                                ? trim($token)
                                : $this->generateUniqueToken('customers', 'identity_token'),
                        ]);
                }
            });

        try {
            Schema::table('customers', function (Blueprint $table): void {
                $table->unique('identity_token');
            });
        } catch (\Throwable) {
            // Ignore rollback index conflicts if identity_token unique already exists.
        }

        Schema::dropIfExists('customer_tokens');
    }

    protected function seedCustomerTokens(): void
    {
        $hasIdentityTokenColumn = Schema::hasColumn('customers', 'identity_token');
        $now = now();

        DB::table('customers')
            ->select($hasIdentityTokenColumn ? ['id', 'identity_token'] : ['id'])
            ->orderBy('id')
            ->chunkById(200, function (Collection $customers) use ($hasIdentityTokenColumn, $now): void {
                foreach ($customers as $customer) {
                    $candidateToken = $hasIdentityTokenColumn ? ($customer->identity_token ?? null) : null;
                    $token = is_string($candidateToken) && trim($candidateToken) !== ''
                        ? trim($candidateToken)
                        : $this->generateUniqueToken('customer_tokens', 'token');

                    $alreadyExists = DB::table('customer_tokens')
                        ->where('token', $token)
                        ->exists();

                    if ($alreadyExists) {
                        continue;
                    }

                    DB::table('customer_tokens')->insert([
                        'customer_id' => $customer->id,
                        'token' => $token,
                        'first_seen_at' => $now,
                        'last_seen_at' => $now,
                        'last_seen_channel' => null,
                        'last_seen_user_agent' => null,
                        'last_seen_ip' => null,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            });
    }

    protected function dropIdentityTokenColumnIfExists(): void
    {
        if (! Schema::hasColumn('customers', 'identity_token')) {
            return;
        }

        try {
            Schema::table('customers', function (Blueprint $table): void {
                $table->dropUnique(['identity_token']);
            });
        } catch (\Throwable) {
            // Some environments may already have the unique index removed.
        }

        Schema::table('customers', function (Blueprint $table): void {
            $table->dropColumn('identity_token');
        });
    }

    protected function generateUniqueToken(string $table, string $column): string
    {
        do {
            $token = Str::ulid()->toBase32();
        } while (DB::table($table)->where($column, $token)->exists());

        return $token;
    }
};
