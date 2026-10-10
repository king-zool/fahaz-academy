import { useState, type FormEvent } from 'react';
import { academy, classes, WHATSAPP_NUMBER } from './data';
import { buildWhatsAppUrl, isWhatsAppConfigured } from './whatsapp';
export function EnquiryForm({type}: {type:'Training'|'Project'}) {
 const [status,setStatus] = useState('');
 const training = type === 'Training';
 const prefix = type.toLowerCase();
 const configured = isWhatsAppConfigured(WHATSAPP_NUMBER);
 function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = Array.from(new FormData(form).entries()).map(([key,value]) => [key,String(value)] as [string,string]);
  if (fields.some(([key,value]) => key !== 'Budget' && !value.trim())) {setStatus('Please complete all required fields.'); return;}
  if (!configured) {setStatus('The academy’s WhatsApp number is to be confirmed. Please call '+academy.phone+'.'); return;}
  const tab = window.open(buildWhatsAppUrl(WHATSAPP_NUMBER,type,fields),'_blank');
  if (tab) {tab.opener=null; setStatus('WhatsApp has been opened. Please send your enquiry there.');}
  else setStatus('Your browser blocked the new tab. Allow pop-ups and try again.');
 }
 return <form onSubmit={submit} className="enquiry-form">
  <div className="form-row"><label htmlFor={`${prefix}-name`}>Name<input id={`${prefix}-name`} name="Name" autoComplete="name" required maxLength={100} placeholder="Your name"/></label>
  <label htmlFor={`${prefix}-phone`}>Phone<input id={`${prefix}-phone`} name="Phone" type="tel" autoComplete="tel" required pattern="[+0-9() .-]{7,25}" minLength={7} maxLength={25} placeholder="Your phone number" title="Enter a phone number using 7–25 digits, spaces or phone punctuation."/></label></div>
  {training ? <>
   <label htmlFor="training-interest">Interest<select id="training-interest" name="Interest" required defaultValue=""><option value="" disabled>Select an interest</option><option>Blockchain training</option><option>Crypto classes</option></select></label>
   <div className="form-row"><label htmlFor="training-experience">Prior experience<select id="training-experience" name="Experience" required defaultValue=""><option value="" disabled>Select experience</option><option>No prior experience</option><option>Some experience</option><option>Experienced</option></select></label>
   <label htmlFor="training-level">Class level considered<select id="training-level" name="Class level" required defaultValue=""><option value="" disabled>Select a level</option>{classes.map(c=><option key={c.name}>{c.name}</option>)}<option>Not sure yet</option></select></label></div>
  </> : <>
   <label htmlFor="project-details">What would you like to build or need help with?<textarea id="project-details" name="Project or help needed" required rows={4} maxLength={2000} placeholder="Briefly describe your enquiry"/></label>
   <div className="form-row"><label htmlFor="project-timeline">Expected timeline<input id="project-timeline" name="Expected timeline" required maxLength={150} placeholder="A date, timeframe, or not sure yet"/></label><label htmlFor="project-budget">Budget <span className="optional">(optional)</span><input id="project-budget" name="Budget" maxLength={100} placeholder="Your proposed budget"/></label></div>
  </>}
  <button className="button primary" type="submit">Send via WhatsApp <span aria-hidden="true">↗</span></button>
  <p className="form-helper">This opens WhatsApp so you can send your enquiry to the academy.</p>
  {!configured && <p className="form-note">WhatsApp number: to be confirmed with the academy. For now, <a href={`tel:${academy.phone}`}>call {academy.phone}</a>.</p>}
  <p className="status" role="status" aria-live="polite">{status}</p>
 </form>;
}
