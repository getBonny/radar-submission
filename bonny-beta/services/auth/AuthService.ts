import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

class AuthService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }

    async signUp(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
        const { data, error } = await this.supabase.auth.signUp({ email, password });
        return { user: data.user, error };
    }

    async signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
        const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
        return { user: data.user, error };
    }

    async signOut(): Promise<{ error: Error | null }> {
        const { error } = await this.supabase.auth.signOut();
        return { error };
    }

    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await this.supabase.auth.getUser();
        return user;
    }

    async resetPassword(email: string): Promise<{ data: {} | null; error: Error | null }> {
        return await this.supabase.auth.resetPasswordForEmail(email);
    }

    onAuthStateChange(callback: (event: string, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback);
    }
}

export default new AuthService();
