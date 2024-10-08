import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BonnyAuthGuard extends AuthGuard('supabase') {}
