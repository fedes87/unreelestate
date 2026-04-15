#!/usr/bin/env python3
"""Generate Unreel Estate workflow and Stripe brief PDFs."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib.styles import ParagraphStyle

LOGO_PATH = '/Users/galliprodutions/Documents/unreelestate-repo/public/logo-email.png'

# Brand colors
BG = HexColor('#0d0b09')
BG_CARD = HexColor('#1A1714')
GOLD = HexColor('#C4956A')
GOLD_LIGHT = HexColor('#E0BF99')
TEXT = HexColor('#FAF7F2')
TEXT_SEC = HexColor('#7A6A5A')
BORDER = HexColor('#2A2420')

def draw_bg(canvas_obj, doc):
    """Draw dark background on every page."""
    canvas_obj.saveState()
    canvas_obj.setFillColor(BG)
    canvas_obj.rect(0, 0, letter[0], letter[1], fill=1, stroke=0)
    # Gold line at top
    canvas_obj.setStrokeColor(GOLD)
    canvas_obj.setLineWidth(2)
    canvas_obj.line(40, letter[1] - 40, letter[0] - 40, letter[1] - 40)
    # Footer
    canvas_obj.setFillColor(TEXT_SEC)
    canvas_obj.setFont('Helvetica', 8)
    canvas_obj.drawString(40, 30, 'Unreel Estate | Galli Productions')
    canvas_obj.drawRightString(letter[0] - 40, 30, f'Page {canvas_obj.getPageNumber()}')
    canvas_obj.restoreState()

# Styles
style_title = ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=28, textColor=TEXT, leading=34, spaceAfter=2)
style_subtitle = ParagraphStyle('Subtitle', fontName='Helvetica', fontSize=14, textColor=GOLD, leading=18, spaceAfter=36)
style_h1 = ParagraphStyle('H1', fontName='Helvetica-Bold', fontSize=18, textColor=GOLD, spaceBefore=28, spaceAfter=10)
style_h2 = ParagraphStyle('H2', fontName='Helvetica-Bold', fontSize=13, textColor=TEXT, spaceBefore=14, spaceAfter=6)
style_body = ParagraphStyle('Body', fontName='Helvetica', fontSize=10.5, textColor=TEXT, leading=16, spaceAfter=4)
style_bullet = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=10.5, textColor=TEXT, leading=16, leftIndent=20, spaceAfter=3, bulletIndent=8, bulletFontName='Helvetica', bulletFontSize=10.5, bulletColor=GOLD)
style_sub_bullet = ParagraphStyle('SubBullet', fontName='Helvetica', fontSize=10, textColor=HexColor('#B0A090'), leading=15, leftIndent=40, spaceAfter=2, bulletIndent=28, bulletFontName='Helvetica', bulletFontSize=10, bulletColor=TEXT_SEC)
style_note = ParagraphStyle('Note', fontName='Helvetica-Oblique', fontSize=10, textColor=TEXT_SEC, leading=15, spaceAfter=3, leftIndent=20, bulletIndent=8)
style_gold_body = ParagraphStyle('GoldBody', fontName='Helvetica', fontSize=10.5, textColor=GOLD_LIGHT, leading=16, spaceAfter=4)

def bullet(text, style=None):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', style or style_bullet)

def sub_bullet(text):
    return Paragraph(f'<bullet>-</bullet> {text}', style_sub_bullet)

# ============================================================
# DOCUMENT 1: CLIENT WORKFLOW
# ============================================================
def build_workflow():
    doc = SimpleDocTemplate(
        '/Users/galliprodutions/Documents/unreelestate-repo/docs/unreelestate-workflow.pdf',
        pagesize=letter,
        leftMargin=50, rightMargin=50, topMargin=65, bottomMargin=55
    )
    story = []

    story.append(Image(LOGO_PATH, width=240, height=48))
    story.append(Spacer(1, 16))
    story.append(Paragraph('Client Workflow', ParagraphStyle('T2', fontName='Helvetica-Bold', fontSize=22, textColor=GOLD, leading=28, spaceAfter=8)))
    story.append(Paragraph('From first contact to final delivery', style_subtitle))
    story.append(Spacer(1, 10))

    # STEP 1
    story.append(Paragraph('Step 1 &mdash; First Contact', style_h1))
    story.append(bullet('Client fills out contact form on unreelestate.com'))
    story.append(sub_bullet('Name, email, phone, property type, service interest, message'))
    story.append(bullet('Or reaches out via email (info@unreelestate.com) or WhatsApp'))
    story.append(bullet('Automated confirmation email sent to client'))

    # STEP 2
    story.append(Paragraph('Step 2 &mdash; Proposal &amp; Quote', style_h1))
    story.append(bullet('Team reviews request within 24 hours'))
    story.append(bullet('Personalized proposal sent via email with:'))
    story.append(sub_bullet('Recommended package (Listing $399 or Signature $599)'))
    story.append(sub_bullet('Relevant add-ons if applicable'))
    story.append(sub_bullet('Timeline estimate (48h standard delivery)'))
    story.append(sub_bullet('Stripe Payment Link for full payment'))

    # STEP 3
    story.append(Paragraph('Step 3 &mdash; Payment', style_h1))
    story.append(bullet('Client pays full amount via Stripe Payment Link'))
    story.append(bullet('Stripe sends automatic receipt / invoice'))
    story.append(bullet('Upon payment confirmation, client receives:'))
    story.append(sub_bullet('Upload link (Dropbox shared folder or upload form)'))
    story.append(sub_bullet('Photo guidelines (formats, minimum resolution, what to include)'))

    # STEP 4
    story.append(Paragraph('Step 4 &mdash; Photo Upload', style_h1))
    story.append(bullet('Client uploads 10 photos (Listing) or 15 photos (Signature)'))
    story.append(bullet('Client includes any notes: style preferences, target buyer, special requests'))
    story.append(bullet('Team confirms receipt and starts production'))

    # STEP 5
    story.append(Paragraph('Step 5 &mdash; Production (48 hours)', style_h1))
    story.append(bullet('AI Enhancement pipeline processes all photos'))
    story.append(bullet('Restyling / virtual staging applied per client preferences'))
    story.append(bullet('Cinematic clips generated (4-second per photo)'))
    story.append(bullet('Reel assembled (40s FHD for Listing / 1 min 4K for Signature)'))
    story.append(bullet('All social formats prepared (16:9 + 9:16, MLS, Instagram, TikTok)'))

    # STEP 6
    story.append(Paragraph('Step 6 &mdash; Final Delivery', style_h1))
    story.append(bullet('Complete package delivered via shared folder:'))
    story.append(sub_bullet('Enhanced photos (high-res)'))
    story.append(sub_bullet('Cinematic reel'))
    story.append(sub_bullet('Individual video clips (Signature only)'))
    story.append(sub_bullet('Voiceover version (Signature or add-on)'))
    story.append(sub_bullet('Cover diagram + PDF (Signature or add-on)'))
    story.append(sub_bullet('Social-ready formats with captions &amp; thumbnails'))
    story.append(bullet('Client notified via email with download link'))

    # STEP 7
    story.append(Paragraph('Step 7 &mdash; Follow-Up', style_h1))
    story.append(bullet('48 hours after delivery: check-in email for feedback'))
    story.append(bullet('Request permission to use results as case history'))
    story.append(bullet('If approved: add to portfolio page with agent review / testimonial'))

    # NOTES
    story.append(Spacer(1, 20))
    story.append(Paragraph('Notes', ParagraphStyle('NotesH', fontName='Helvetica-Bold', fontSize=14, textColor=TEXT_SEC, spaceBefore=10, spaceAfter=10)))
    notes = [
        'All communication via email + WhatsApp',
        'Payment: 100% upfront via Stripe',
        'Standard delivery: 48 hours from photo upload',
        'Rush delivery available on request (+$100)',
        'Revisions: 1 round included, additional at $50/round',
    ]
    for n in notes:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {n}', style_note))

    doc.build(story, onFirstPage=draw_bg, onLaterPages=draw_bg)
    print('Created: unreelestate-workflow.pdf')

# ============================================================
# DOCUMENT 2: STRIPE SETUP BRIEF
# ============================================================
def build_stripe():
    doc = SimpleDocTemplate(
        '/Users/galliprodutions/Documents/unreelestate-repo/docs/unreelestate-stripe-brief.pdf',
        pagesize=letter,
        leftMargin=50, rightMargin=50, topMargin=65, bottomMargin=55
    )
    story = []

    story.append(Image(LOGO_PATH, width=240, height=48))
    story.append(Spacer(1, 16))
    story.append(Paragraph('Stripe Payment Setup', ParagraphStyle('T2', fontName='Helvetica-Bold', fontSize=22, textColor=GOLD, leading=28, spaceAfter=8)))
    story.append(Paragraph('Payment Links &amp; Invoice Configuration', style_subtitle))
    story.append(Spacer(1, 10))

    # ACCOUNT SETTINGS
    story.append(Paragraph('Account Settings', style_h1))
    story.append(bullet('Business name: Galli Productions (or DBA Unreel Estate &mdash; check with accountant)'))
    story.append(bullet('Statement descriptor: <b>UNREEL ESTATE</b>'))
    story.append(bullet('Support email: info@unreelestate.com'))
    story.append(bullet('Currency: USD (primary), EUR (secondary for European clients)'))

    # PAYMENT LINKS
    story.append(Paragraph('Payment Links to Create', style_h1))

    # Link 1
    story.append(Paragraph('1. Listing Package', style_h2))
    story.append(bullet('Product name: Unreel Estate &mdash; Listing Package'))
    story.append(bullet('Price: <b>$399.00 USD</b>'))
    story.append(bullet('Description: 10 AI-enhanced photos, 40-second cinematic reel (FHD), all social formats included. Royalty-free music. 48-hour delivery.'))
    story.append(bullet('After payment redirect: thank you page or upload instructions URL'))
    story.append(bullet('Receipt: automatic'))

    # Link 2
    story.append(Paragraph('2. Signature Package', style_h2))
    story.append(bullet('Product name: Unreel Estate &mdash; Signature Package'))
    story.append(bullet('Price: <b>$599.00 USD</b>'))
    story.append(bullet('Description: 15 AI-enhanced photos, 1-minute cinematic reel (4K), 15 individual vertical clips, AI voiceover, cover diagram + PDF, all social formats. 48-hour delivery.'))
    story.append(bullet('After payment redirect: thank you page or upload instructions URL'))
    story.append(bullet('Receipt: automatic'))

    # Link 3
    story.append(Paragraph('3. Add-on &mdash; Extra Photo + Clip', style_h2))
    story.append(bullet('Product name: Extra Photo + Video Clip'))
    story.append(bullet('Price: <b>$20.00 USD</b>'))
    story.append(bullet('Description: One additional AI-enhanced photo with corresponding 4-second cinematic video clip.'))

    # Link 4
    story.append(Paragraph('4. Add-on &mdash; AI Voiceover', style_h2))
    story.append(bullet('Product name: AI Voiceover Add-on'))
    story.append(bullet('Price: <b>$50.00 USD</b>'))
    story.append(bullet('Description: AI-generated voiceover for your cinematic reel. Choose from sample voices.'))

    # Link 5
    story.append(Paragraph('5. Add-on &mdash; Cover + PDF', style_h2))
    story.append(bullet('Product name: Cover Diagram + Property PDF'))
    story.append(bullet('Price: <b>$20.00 USD</b>'))
    story.append(bullet('Description: Professional cover diagram and full property PDF document.'))

    # INVOICE TEMPLATE
    story.append(Paragraph('Invoice Template Fields', style_h1))
    story.append(bullet('From: Galli Productions LLC, [address], EIN: [your EIN]'))
    story.append(bullet('Brand: Unreel Estate'))
    story.append(bullet('To: Client name, email, company (if applicable)'))
    story.append(bullet('Line items: Package name, add-ons, total'))
    story.append(bullet('Payment terms: Due upon receipt'))
    story.append(bullet('For EU clients add note:'))
    story.append(Paragraph('<i>"Service provided by US entity &mdash; reverse charge applies per EU VAT Directive"</i>', style_gold_body))
    story.append(bullet('Auto-reminders: after 3 days, after 7 days'))

    # RECOMMENDED FEATURES
    story.append(Paragraph('Recommended Stripe Features', style_h1))
    story.append(bullet('<b>Stripe Invoicing</b> ($0.40/invoice) &mdash; worth it for tracking'))
    story.append(bullet('<b>Stripe Tax</b> &mdash; auto-calculates tax obligations if needed'))
    story.append(bullet('<b>Customer Portal</b> &mdash; clients can view past invoices/receipts'))
    story.append(bullet('<b>Email receipts</b>: ON'))
    story.append(bullet('<b>Payment confirmation page</b>: customize with upload instructions'))

    doc.build(story, onFirstPage=draw_bg, onLaterPages=draw_bg)
    print('Created: unreelestate-stripe-brief.pdf')

if __name__ == '__main__':
    build_workflow()
    build_stripe()
    print('\nDone! Files saved to docs/')
