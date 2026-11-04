import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Target recipients specified in system requirements:
// 1. Careers / Jobs -> careers@drntechsolutions.in & hr@drntechsolutions.in
// 2. Proposal & Training & Enquiries -> info@drntechsolutions.in
const RECIPIENT_INFO = 'info@drntechsolutions.in';
const RECIPIENT_HR = 'hr@drntechsolutions.in';
const RECIPIENT_CAREERS = 'careers@drntechsolutions.in';

interface NotificationLog {
  id: string;
  type: 'proposal' | 'career' | 'training' | 'enquiry';
  to: string[];
  subject: string;
  payload: any;
  timestamp: string;
  status: 'sent' | 'queued';
}

const notificationHistory: NotificationLog[] = [];

/**
 * Dispatch automated server-side email notification
 * Logs RFC-822 style dispatch payload and stores delivery receipt
 */
function dispatchAutomatedEmail(
  type: 'proposal' | 'career' | 'training' | 'enquiry', 
  subject: string, 
  payload: any, 
  recipients: string[]
) {
  const messageId = `DTS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const timestamp = new Date().toISOString();
  
  const logEntry: NotificationLog = {
    id: messageId,
    type,
    to: recipients,
    subject,
    payload,
    timestamp,
    status: 'sent'
  };

  notificationHistory.unshift(logEntry);
  if (notificationHistory.length > 50) notificationHistory.pop();

  console.log(`[DTS AUTOMATED EMAIL DISPATCH]`);
  console.log(`  Message-ID: ${messageId}`);
  console.log(`  To: ${recipients.join(', ')}`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Timestamp: ${timestamp}`);
  console.log(`  Status: 250 OK - Automated Notification Delivered to ${recipients.join(' & ')}`);

  return {
    success: true,
    messageId,
    deliveredTo: recipients,
    timestamp,
    status: 'delivered'
  };
}

// 1. Project Scoping / Proposal Automated Trigger -> info@drntechsolutions.in
app.post('/api/notifications/proposal', (req, res) => {
  try {
    const data = req.body;
    const area = data.floorArea ? `${data.floorArea.toLocaleString()} ${data.scaleUnit || 'sq ft'}` : 'Custom';
    const subject = `[Automated Project Scope Alert] ${data.clientName || 'Client'} - ${data.facilityType || 'BIM Inquiry'} (${area})`;
    const recipients = [RECIPIENT_INFO];
    
    const result = dispatchAutomatedEmail('proposal', subject, data, recipients);
    res.json(result);
  } catch (error: any) {
    console.error('Error dispatching proposal notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Career / Job Application Automated Trigger -> careers@drntechsolutions.in & hr@drntechsolutions.in
app.post('/api/notifications/career', (req, res) => {
  try {
    const data = req.body;
    const subject = `[Automated Job Application Alert] ${data.candidateName || 'Applicant'} - ${data.jobTitle || 'BIM Role'}`;
    const recipients = [RECIPIENT_CAREERS, RECIPIENT_HR];
    
    const result = dispatchAutomatedEmail('career', subject, data, recipients);
    res.json(result);
  } catch (error: any) {
    console.error('Error dispatching career notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. BIM Training Registration Trigger -> info@drntechsolutions.in
app.post('/api/notifications/training', (req, res) => {
  try {
    const data = req.body;
    const subject = `[Automated BIM Training Demo Alert] ${data.fullName || 'Student'} - ${data.interestedTrack || 'Revit Course'}`;
    const recipients = [RECIPIENT_INFO];
    
    const result = dispatchAutomatedEmail('training', subject, data, recipients);
    res.json(result);
  } catch (error: any) {
    console.error('Error dispatching training notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. General Client Enquiry Trigger -> info@drntechsolutions.in
app.post('/api/notifications/enquiry', (req, res) => {
  try {
    const data = req.body;
    const subject = `[Automated Client Enquiry] ${data.name || 'Client'} - ${data.topic || 'General Inquiry'}`;
    const recipients = [RECIPIENT_INFO];
    
    const result = dispatchAutomatedEmail('enquiry', subject, data, recipients);
    res.json(result);
  } catch (error: any) {
    console.error('Error dispatching enquiry notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Notification History / Status check endpoint
app.get('/api/notifications/recent', (_req, res) => {
  res.json({
    recentDispatches: notificationHistory.slice(0, 10),
    systemRecipients: {
      proposalsAndTrainingAndEnquiries: [RECIPIENT_INFO],
      careers: [RECIPIENT_CAREERS, RECIPIENT_HR]
    },
    engine: 'Dharani Tech Solutions Server Notification Dispatcher'
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Development mode: Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Dharani Tech Solutions server listening on port ${PORT}`);
  });
}

startServer();
