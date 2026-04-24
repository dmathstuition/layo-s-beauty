/**
 * ══════════════════════════════════════════════════════════
 * LAYO'S LUXE STUDIO — Google Apps Script Backend
 * File: Code.gs
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Rename it to "Layos Luxe Studio - Contact Form"
 * 4. Replace all code with this file
 * 5. Create a Google Sheet named "Layos Luxe Studio CRM"
 * 6. Copy the Sheet ID from its URL and paste below
 * 7. Set your notification email below
 * 8. Deploy as Web App (see README for full steps)
 * ══════════════════════════════════════════════════════════
 */

// ─── CONFIGURATION ────────────────────────────────────────
var CONFIG = {
  SPREADSHEET_ID:     'YOUR_GOOGLE_SHEET_ID_HERE',   // ← Replace this
  SHEET_NAME:         'Enquiries',
  NOTIFICATION_EMAIL: 'oladembak@gmail.com',   // ← Replace with your email
  BRAND_NAME:         "Layo's Luxe Studio",
  AUTO_REPLY:         true  // Set to false to disable auto-reply emails to clients
};

// ─── HEADERS for Google Sheets ────────────────────────────
var HEADERS = [
  '📅 Timestamp',
  '👤 First Name',
  '👤 Last Name',
  '📧 Email',
  '📞 Phone',
  '💅 Service Interested In',
  '💬 Message',
  '🌐 Source',
  '🔖 Status'
];

// ─── HANDLE POST REQUEST (Form Submissions) ───────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    saveToSheet(data);
    sendNotificationEmail(data);

    if (CONFIG.AUTO_REPLY && data.email) {
      sendAutoReplyEmail(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status:  'success',
        message: 'Enquiry received successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status:  'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── HANDLE GET REQUEST (Health Check) ───────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status:    'active',
      message:   CONFIG.BRAND_NAME + ' Contact Form API is live',
      timestamp: new Date().toLocaleString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── SAVE DATA TO GOOGLE SHEETS ───────────────────────────
function saveToSheet(data) {
  var ss    = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    setupSheetHeaders(sheet);
  }

  if (sheet.getLastRow() === 0) {
    setupSheetHeaders(sheet);
  }

  sheet.appendRow([
    data.timestamp || new Date().toLocaleString(),
    data.firstName  || '',
    data.lastName   || '',
    data.email      || '',
    data.phone      || '',
    data.service    || 'Not specified',
    data.message    || '',
    data.source     || 'Website',
    'New'
  ]);

  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, HEADERS.length).setBackground('#FFF8F5');

  Logger.log('Data saved to sheet. Row: ' + lastRow);
}

// ─── SETUP SHEET HEADERS & FORMATTING ────────────────────
function setupSheetHeaders(sheet) {
  sheet.appendRow(HEADERS);

  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground('#C2185B');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);

  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 130);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 200);
  sheet.setColumnWidth(7, 350);
  sheet.setColumnWidth(8, 180);
  sheet.setColumnWidth(9, 100);

  sheet.setFrozenRows(1);
  Logger.log('Sheet headers set up.');
}

// ─── SEND NOTIFICATION EMAIL TO STUDIO OWNER ─────────────
function sendNotificationEmail(data) {
  var subject = '✨ New Enquiry — ' + CONFIG.BRAND_NAME + ' | ' +
                (data.service || 'General') + ' | ' +
                (data.firstName || '') + ' ' + (data.lastName || '');

  var htmlBody =
    '<div style="margin:0;padding:0;background-color:#f4eae1;font-family:Georgia,serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4eae1;">' +
    '<tr><td align="center" style="padding:30px 15px;">' +

    '<!-- CARD -->' +
    '<table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 30px rgba(194,24,91,0.12);">' +

    '<!-- HEADER -->' +
    '<tr><td style="background:linear-gradient(135deg,#C2185B,#D6336C);padding:32px 30px;text-align:center;">' +
    '<p style="margin:0 0 6px;color:#D4AF37;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;">New Enquiry Received</p>' +
    '<h1 style="margin:0;color:#ffffff;font-family:Georgia,serif;font-size:26px;font-weight:bold;">&#9819; Layo\'s Luxe Studio</h1>' +
    '<p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-family:Georgia,serif;font-size:13px;font-style:italic;">Beauty. Style. Confidence.</p>' +
    '</td></tr>' +

    '<!-- ALERT BANNER -->' +
    '<tr><td style="background-color:#FFF8E1;border-left:4px solid #D4AF37;padding:14px 24px;">' +
    '<p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#5D4037;">' +
    '<strong>&#128276; Action Required:</strong> A new client enquiry has been submitted from your website.' +
    '</p>' +
    '</td></tr>' +

    '<!-- CLIENT DETAILS -->' +
    '<tr><td style="padding:30px;">' +
    '<h2 style="margin:0 0 18px;font-family:Georgia,serif;font-size:18px;color:#C2185B;border-bottom:2px solid #F4EAE1;padding-bottom:10px;">Client Details</h2>' +

    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +

    '<tr>' +
    '<td width="35%" style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a6a7a;">Full Name</td>' +
    '<td style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:14px;color:#2d1525;"><strong>' + (data.firstName || '') + ' ' + (data.lastName || '') + '</strong></td>' +
    '</tr>' +

    '<tr>' +
    '<td width="35%" style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a6a7a;">Email</td>' +
    '<td style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:14px;"><a href="mailto:' + (data.email || '') + '" style="color:#C2185B;text-decoration:none;">' + (data.email || '') + '</a></td>' +
    '</tr>' +

    '<tr>' +
    '<td width="35%" style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a6a7a;">Phone</td>' +
    '<td style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:14px;"><a href="tel:' + (data.phone || '') + '" style="color:#C2185B;text-decoration:none;">' + (data.phone || 'Not provided') + '</a></td>' +
    '</tr>' +

    '<tr>' +
    '<td width="35%" style="padding:10px 0;border-bottom:1px solid #F4EAE1;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a6a7a;">Service</td>' +
    '<td style="padding:10px 0;border-bottom:1px solid #F4EAE1;">' +
    '<span style="display:inline-block;background:#C2185B;color:#ffffff;padding:4px 14px;border-radius:30px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;">' + (data.service || 'General Enquiry') + '</span>' +
    '</td>' +
    '</tr>' +

    '<tr>' +
    '<td width="35%" style="padding:10px 0;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a6a7a;">Submitted</td>' +
    '<td style="padding:10px 0;font-family:Arial,sans-serif;font-size:14px;color:#2d1525;">' + (data.timestamp || '') + '</td>' +
    '</tr>' +

    '</table>' +

    '<!-- MESSAGE -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">' +
    '<tr><td>' +
    '<p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#C2185B;">Message</p>' +
    '<table width="100%" cellpadding="20" cellspacing="0" border="0" style="background-color:#FFF8F5;border:1px solid #F4EAE1;border-radius:10px;">' +
    '<tr><td><p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#5a3a4a;line-height:1.8;font-style:italic;">&ldquo;' + (data.message || '') + '&rdquo;</p></td></tr>' +
    '</table>' +
    '</td></tr>' +
    '</table>' +

    '<!-- CTA BUTTON -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;">' +
    '<tr><td align="center">' +
    '<a href="mailto:' + (data.email || '') + '?subject=Re:%20Your%20Enquiry%20%E2%80%94%20Layo\'s%20Luxe%20Studio" ' +
    'style="display:inline-block;background:#C2185B;color:#ffffff;padding:14px 32px;border-radius:30px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;text-decoration:none;">Reply to Client &rarr;</a>' +
    '</td></tr>' +
    '</table>' +

    '</td></tr>' + // end padding cell

    '<!-- FOOTER -->' +
    '<tr><td style="background-color:#111111;padding:22px 30px;text-align:center;">' +
    '<p style="margin:0;font-family:Georgia,serif;font-size:13px;color:rgba(255,255,255,0.5);">&#9819; Layo\'s Luxe Studio &nbsp;|&nbsp; <em style="color:#D4AF37;">Beauty. Style. Confidence.</em></p>' +
    '<p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);">This is an automated notification from your website contact form.</p>' +
    '</td></tr>' +

    '</table>' + // end card
    '</td></tr>' +
    '</table>' + // end outer
    '</div>';

  MailApp.sendEmail({
    to:       CONFIG.NOTIFICATION_EMAIL,
    subject:  subject,
    htmlBody: htmlBody
  });

  Logger.log('Notification email sent to: ' + CONFIG.NOTIFICATION_EMAIL);
}

// ─── SEND AUTO-REPLY TO CLIENT ─────────────────────────────
function sendAutoReplyEmail(data) {
  var subject = "We received your enquiry — Layo's Luxe Studio &#9819;";

  var steps = [
    { num: '1', text: 'We review your enquiry carefully' },
    { num: '2', text: 'Our team contacts you to confirm details' },
    { num: '3', text: 'We book your appointment or process your order' },
    { num: '4', text: 'You experience the Layo\'s Luxe difference &#10024;' }
  ];

  var stepsHtml = '';
  for (var i = 0; i < steps.length; i++) {
    stepsHtml +=
      '<tr>' +
      '<td width="36" valign="top" style="padding:0 12px 12px 0;">' +
      '<table width="36" height="36" cellpadding="0" cellspacing="0" border="0">' +
      '<tr><td align="center" valign="middle" style="width:36px;height:36px;background-color:#C2185B;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;color:#ffffff;">' + steps[i].num + '</td></tr>' +
      '</table>' +
      '</td>' +
      '<td valign="middle" style="padding:0 0 12px 0;font-family:Arial,sans-serif;font-size:13px;color:#5a3a4a;line-height:1.6;">' + steps[i].text + '</td>' +
      '</tr>';
  }

  var htmlBody =
    '<div style="margin:0;padding:0;background-color:#f4eae1;font-family:Georgia,serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4eae1;">' +
    '<tr><td align="center" style="padding:30px 15px;">' +

    '<!-- CARD -->' +
    '<table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 30px rgba(194,24,91,0.12);">' +

    '<!-- HEADER -->' +
    '<tr><td style="background:linear-gradient(135deg,#C2185B,#D6336C);padding:40px 30px;text-align:center;">' +
    '<p style="margin:0 0 10px;color:#D4AF37;font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;">Thank You For Reaching Out</p>' +
    '<h1 style="margin:0;color:#ffffff;font-family:Georgia,serif;font-size:28px;font-weight:bold;">&#9819; Layo\'s Luxe Studio</h1>' +
    '<p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-family:Georgia,serif;font-size:14px;font-style:italic;">Beauty. Style. Confidence.</p>' +
    '</td></tr>' +

    '<!-- BODY -->' +
    '<tr><td style="padding:36px 35px 20px;">' +

    '<p style="margin:0 0 6px;font-family:Georgia,serif;font-size:16px;color:#2d1525;">Hello, <strong>' + (data.firstName || 'there') + '</strong>! &#128081;</p>' +
    '<p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;color:#5a3a4a;line-height:1.8;">Thank you for contacting <strong>Layo\'s Luxe Studio</strong>! We\'ve received your enquiry and we\'re absolutely delighted to hear from you.</p>' +

    '<!-- ENQUIRY SUMMARY BOX -->' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFF8F5;border-left:4px solid #C2185B;border-radius:0 10px 10px 0;margin-bottom:24px;">' +
    '<tr><td style="padding:18px 20px;">' +
    '<p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#5a3a4a;line-height:1.8;">' +
    '<strong style="color:#C2185B;">Your enquiry summary:</strong><br/>' +
    'Service: <strong>' + (data.service || 'General Enquiry') + '</strong><br/>' +
    'Received: ' + (data.timestamp || new Date().toLocaleString()) +
    '</p>' +
    '</td></tr>' +
    '</table>' +

    '<p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:14px;color:#5a3a4a;line-height:1.8;">' +
    'Our team will review your message and get back to you within <strong>24 hours</strong>. ' +
    'If you need to speak with us urgently, feel free to reach us directly via WhatsApp or phone.' +
    '</p>' +

    '</td></tr>' +

    '<!-- WHAT HAPPENS NEXT -->' +
    '<tr><td style="padding:0 35px 28px;">' +
    '<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C2185B;">What Happens Next</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tbody>' + stepsHtml + '</tbody>' +
    '</table>' +
    '</td></tr>' +

    '<!-- SERVICES STRIP -->' +
    '<tr><td style="padding:0 35px 30px;">' +
    '<table width="100%" cellpadding="22" cellspacing="0" border="0" style="background-color:#111111;border-radius:12px;">' +
    '<tr><td style="text-align:center;">' +
    '<p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5);">Our Services</p>' +
    '<p style="margin:0;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;color:#D4AF37;">HAIRSTYLING &nbsp;&middot;&nbsp; MAKEUP &nbsp;&middot;&nbsp; WIGS &nbsp;&middot;&nbsp; LADIES WEAR &nbsp;&middot;&nbsp; STYLING &nbsp;&middot;&nbsp; ACCESSORIES</p>' +
    '</td></tr>' +
    '</table>' +
    '</td></tr>' +

    '<!-- CONTACT INFO -->' +
    '<tr><td style="padding:0 35px 28px;text-align:center;">' +
    '<p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#8a6a7a;line-height:1.8;">' +
    '&#128222; +234 800 000 0000 &nbsp;|&nbsp; &#128231; hello@layosluxestudio.com<br/>' +
    '&#128205; Lagos, Nigeria &nbsp;|&nbsp; &#128336; Mon&ndash;Sat: 9am &ndash; 7pm' +
    '</p>' +
    '</td></tr>' +

    '<!-- BRAND QUOTE -->' +
    '<tr><td style="padding:0 35px 36px;text-align:center;">' +
    '<p style="margin:0;font-family:Georgia,serif;font-size:17px;font-style:italic;color:#C2185B;">' +
    '&ldquo;We don&rsquo;t just beautify &mdash; we transform you to look and feel your best.&rdquo;' +
    '</p>' +
    '</td></tr>' +

    '<!-- FOOTER -->' +
    '<tr><td style="background-color:#111111;padding:26px 30px;text-align:center;">' +
    '<p style="margin:0 0 4px;font-family:Georgia,serif;font-size:16px;color:#ffffff;">&#9819; Layo\'s Luxe Studio</p>' +
    '<p style="margin:0 0 14px;font-family:Georgia,serif;font-size:12px;font-style:italic;color:#D4AF37;">Beauty. Style. Confidence.</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">' +
    '<a href="#" style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.5);text-decoration:none;">Instagram</a>' +
    '<span style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.2);"> &nbsp;|&nbsp; </span>' +
    '<a href="#" style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.5);text-decoration:none;">WhatsApp</a>' +
    '<span style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.2);"> &nbsp;|&nbsp; </span>' +
    '<a href="#" style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.5);text-decoration:none;">TikTok</a>' +
    '</td></tr></table>' +
    '<p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.25);">You are receiving this email because you submitted an enquiry on Layo\'s Luxe Studio website.</p>' +
    '</td></tr>' +

    '</table>' + // end card
    '</td></tr>' +
    '</table>' + // end outer
    '</div>';

  MailApp.sendEmail({
    to:       data.email,
    subject:  subject,
    name:     "Layo's Luxe Studio",
    htmlBody: htmlBody
  });

  Logger.log('Auto-reply sent to: ' + data.email);
}

// ─── UTILITY: INITIALIZE SHEET ────────────────────────────
// Run this function manually once to set up the sheet
function initializeSheet() {
  var ss    = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  sheet.clearContents();
  setupSheetHeaders(sheet);

  Logger.log('Sheet initialized successfully.');
  SpreadsheetApp.getUi().alert('✅ Sheet initialized successfully!');
}

// ─── UTILITY: TEST FORM SUBMISSION ────────────────────────
// Run this function to test the entire flow
function testSubmission() {
  var testData = {
    timestamp: new Date().toLocaleString(),
    firstName: 'Test',
    lastName:  'Client',
    email:     CONFIG.NOTIFICATION_EMAIL,
    phone:     '+234 9017715047',
    service:   'Wig Making & Installation',
    message:   'This is a test submission from the Google Apps Script test function. If you receive this, the setup is working correctly!',
    source:    "Layo's Luxe Studio Website "
  };

  saveToSheet(testData);
  sendNotificationEmail(testData);

  if (CONFIG.AUTO_REPLY) {
    sendAutoReplyEmail(testData);
  }

  Logger.log('Test submission completed.');
  SpreadsheetApp.getUi().alert('✅ Test completed! Check your email and the Enquiries sheet.');
}
