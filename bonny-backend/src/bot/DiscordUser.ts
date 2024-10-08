export interface DiscordUser {
    id: number,
    username: string,
    discriminator: string,
    avatar: string,
    bot: boolean,
    system: boolean,
    mfa_enabled: boolean,
    banner: string,
    accent_color: number,
    locale: string,
    flags: number,
    premium_type: number,
    public_flags: number
}