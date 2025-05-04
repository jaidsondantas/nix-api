import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function formatPhoneNumberToWhatsapp(phone: string): string {
  const phoneNumber = parsePhoneNumberFromString(phone, 'BR');
  if (!phoneNumber || !phoneNumber.isValid()) {
    throw new Error('Invalid phone number');
  }

  let formattedNumber = phoneNumber.number
    .replace('+55', '')
    .replace(/\D/g, '');

  // Remove the extra '9' after the DDD if it exists
  if (formattedNumber.length === 11 && formattedNumber[2] === '9') {
    formattedNumber = formattedNumber.slice(0, 2) + formattedNumber.slice(3);
  }

  return `55${formattedNumber}@s.whatsapp.net`;
}
