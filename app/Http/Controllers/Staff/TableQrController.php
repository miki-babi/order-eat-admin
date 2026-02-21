<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StoreDiningTableRequest;
use App\Http\Requests\Staff\UpdateDiningTableRequest;
use App\Http\Requests\Staff\VerifyTableSessionRequest;
use App\Models\DiningTable;
use App\Models\PickupLocation;
use App\Models\TableSession;
use App\Support\BranchAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TableQrController extends Controller
{
    /**
     * Show table QR assignment and session verification page.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $tablesQuery = DiningTable::query()
            ->with('pickupLocation')
            ->withCount([
                'orders',
                'sessions',
                'sessions as verified_sessions_count' => fn ($query) => $query->whereNotNull('verified_at'),
            ])
            ->orderBy('pickup_location_id')
            ->orderBy('name');

        BranchAccess::scopeQuery($tablesQuery, $user, 'pickup_location_id');

        $tables = $tablesQuery->get()->map(fn (DiningTable $table) => [
            'id' => $table->id,
            'name' => $table->name,
            'qr_code' => $table->qr_code,
            'qr_url' => route('qr-menu.show', ['diningTable' => $table->qr_code]),
            'pickup_location_id' => $table->pickup_location_id,
            'pickup_location_name' => $table->pickupLocation?->name,
            'is_active' => (bool) $table->is_active,
            'orders_count' => $table->orders_count,
            'sessions_count' => $table->sessions_count,
            'verified_sessions_count' => $table->verified_sessions_count,
            'updated_at' => $table->updated_at?->toDateTimeString(),
        ]);

        $sessionsQuery = TableSession::query()
            ->with(['diningTable.pickupLocation', 'verifiedBy'])
            ->latest('started_at')
            ->limit(120);

        $assignedBranchIds = $user->accessiblePickupLocationIds();

        if (! $user->isAdmin() && $assignedBranchIds !== []) {
            $sessionsQuery->whereHas('diningTable', function ($query) use ($assignedBranchIds): void {
                $query->whereIn('pickup_location_id', $assignedBranchIds);
            });
        }

        $sessions = $sessionsQuery->get()->map(fn (TableSession $session) => [
            'id' => $session->id,
            'session_token' => $session->session_token,
            'session_token_short' => substr($session->session_token, 0, 12),
            'table_id' => $session->dining_table_id,
            'table_name' => $session->diningTable?->name,
            'table_qr_code' => $session->diningTable?->qr_code,
            'pickup_location_name' => $session->diningTable?->pickupLocation?->name,
            'started_at' => $session->started_at?->toDateTimeString(),
            'last_seen_at' => $session->last_seen_at?->toDateTimeString(),
            'verified_at' => $session->verified_at?->toDateTimeString(),
            'verified_by' => $session->verifiedBy?->name,
            'verified_note' => $session->verified_note,
            'is_verified' => $session->verified_at !== null,
            'initial_ip' => $session->initial_ip,
        ]);

        $pickupLocations = PickupLocation::query()->orderBy('name');

        if (! $user->isAdmin() && $assignedBranchIds !== []) {
            $pickupLocations->whereIn('id', $assignedBranchIds);
        }

        return Inertia::render('staff/table-qr', [
            'tables' => $tables,
            'sessions' => $sessions,
            'pickupLocations' => $pickupLocations->get(['id', 'name']),
            'summary' => [
                'total_tables' => $tables->count(),
                'active_tables' => $tables->where('is_active', true)->count(),
                'unverified_sessions' => $sessions->where('is_verified', false)->count(),
            ],
        ]);
    }

    /**
     * Create a new table with assigned QR code.
     */
    public function store(StoreDiningTableRequest $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $validated = $request->validated();

        BranchAccess::ensureUserCanAccessBranch($user, (int) $validated['pickup_location_id']);

        DiningTable::query()->create([
            'pickup_location_id' => $validated['pickup_location_id'],
            'name' => $validated['name'],
            'qr_code' => $validated['qr_code'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Table QR assignment created.');
    }

    /**
     * Update table QR assignment.
     */
    public function update(UpdateDiningTableRequest $request, DiningTable $diningTable): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $validated = $request->validated();

        BranchAccess::ensureUserCanAccessBranch($user, (int) $validated['pickup_location_id']);

        $diningTable->update([
            'pickup_location_id' => $validated['pickup_location_id'],
            'name' => $validated['name'],
            'qr_code' => $validated['qr_code'],
            'is_active' => $request->boolean('is_active', $diningTable->is_active),
        ]);

        return back()->with('success', 'Table QR assignment updated.');
    }

    /**
     * Verify a scanned table session from staff dashboard.
     */
    public function verifySession(VerifyTableSessionRequest $request, TableSession $tableSession): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $tableSession->loadMissing('diningTable');

        BranchAccess::ensureUserCanAccessBranch($user, (int) $tableSession->diningTable->pickup_location_id);

        $validated = $request->validated();

        $tableSession->update([
            'verified_at' => now(),
            'verified_by_user_id' => $user->id,
            'verified_note' => $validated['verified_note'] ?? null,
            'last_seen_at' => now(),
        ]);

        return back()->with('success', 'Table session verified.');
    }
}
