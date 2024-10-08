import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { OwnershipInterceptor } from './ownership.interceptor';

/**
 * @description
 * Decorator, um die Eigentumsrechte des aktuellen Benutzers an einer Entität zu überprüfen.
 * Der Dekorator verwendet den OwnershipInterceptor, um sicherzustellen,
 * dass die **zurückgegebene** Entität dem aktuellen Benutzer gehört.
 * **Betrifft nur User mit der Rolle "AppUser".**
 *
 * @param {string} userIdProperty - Der Name der Property der zurückgegebenen Entität, die die Benutzer-ID enthält.
 *                                  Standardwert ist 'userId'.
 *
 * @example
 * \@CheckOwnership('userId')
 * \@Get(':id')
 * async getTransaction(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
 *   return this.transactionService.get(id);
 * }
 *
 *
 * @returns {MethodDecorator & ClassDecorator} - Gibt einen kombinierten MethodDecorator und ClassDecorator zurück.
 */
export function CheckOwnership(userIdProperty: string = 'userId') {
  return applyDecorators(
    UseInterceptors(new OwnershipInterceptor(userIdProperty)),
  );
}
