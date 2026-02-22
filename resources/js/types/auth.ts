export type User = {
    id: number;
    name: string;
    email: string;
    role?: 'admin' | 'system_admin' | 'branch_manager' | 'branch_staff' | 'customer' | string;
    role_slugs?: string[];
    permission_slugs?: string[];
    pickup_location_ids?: number[];
    is_admin?: boolean;
    is_system_admin?: boolean;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
