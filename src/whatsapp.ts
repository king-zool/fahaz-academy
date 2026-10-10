export function isWhatsAppConfigured(number: string): boolean {
 return /^[1-9]\d{7,14}$/.test(number);
}
export function buildWhatsAppUrl(number: string, kind: string, fields: [string, string][]): string {
 if (!isWhatsAppConfigured(number)) throw new Error('WhatsApp number is not confirmed.');
 const message = `${kind} enquiry:\n` + fields.map(([label,value]) => `${label}: ${value.trim() || 'Not specified'}`).join('\n');
 return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
