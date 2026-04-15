#!/usr/bin/env python3
"""
Unreel Estate — Trilingual Service Agreement Generator
Generates a professional PDF contract in English, Italian, and Spanish.
Brand of Galli Productions LLC.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak,
    Table, TableStyle, HRFlowable
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# --- BRAND COLORS ---
BG_COLOR = HexColor("#0d0b09")
GOLD = HexColor("#C4956A")
TEXT_COLOR = HexColor("#FAF7F2")
SECONDARY = HexColor("#7A6A5A")

# --- PATHS ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
LOGO_PATH = os.path.join(REPO_ROOT, "public", "logo-email.png")
OUTPUT_PATH = os.path.join(SCRIPT_DIR, "unreelestate-service-agreement.pdf")

# --- STYLES ---
def make_styles():
    base = dict(fontName="Helvetica", textColor=TEXT_COLOR)
    return {
        "title": ParagraphStyle(
            "title", fontSize=28, leading=34, alignment=TA_CENTER,
            spaceAfter=6, textColor=GOLD, fontName="Helvetica-Bold",
        ),
        "subtitle": ParagraphStyle(
            "subtitle", fontSize=22, leading=28, alignment=TA_CENTER,
            spaceAfter=20, textColor=SECONDARY, fontName="Helvetica",
        ),
        "h1": ParagraphStyle(
            "h1", fontSize=16, leading=22, spaceAfter=10, spaceBefore=18,
            textColor=GOLD, fontName="Helvetica-Bold",
        ),
        "body": ParagraphStyle(
            "body", fontSize=10.5, leading=16, spaceAfter=8,
            textColor=TEXT_COLOR, fontName="Helvetica",
        ),
        "body_bold": ParagraphStyle(
            "body_bold", fontSize=10.5, leading=16, spaceAfter=8,
            textColor=TEXT_COLOR, fontName="Helvetica-Bold",
        ),
        "body_secondary": ParagraphStyle(
            "body_secondary", fontSize=10.5, leading=16, spaceAfter=8,
            textColor=SECONDARY, fontName="Helvetica",
        ),
        "small": ParagraphStyle(
            "small", fontSize=9, leading=13, spaceAfter=4,
            textColor=SECONDARY, fontName="Helvetica",
        ),
        "footer": ParagraphStyle(
            "footer", fontSize=8, leading=11, textColor=SECONDARY,
            fontName="Helvetica", alignment=TA_CENTER,
        ),
    }

STYLES = make_styles()

# ---------------------------------------------------------------------------
# PAGE BACKGROUND + FOOTER
# ---------------------------------------------------------------------------
class NumberedCanvas:
    """Custom canvas that draws background, gold top line, and footer."""
    def __init__(self, doc):
        self.doc = doc
        self.pages = []

    def afterPage(self, canvas, doc):
        self.pages.append(canvas.getPageNumber())

    @staticmethod
    def draw_page(canvas, doc):
        w, h = letter
        # dark background
        canvas.setFillColor(BG_COLOR)
        canvas.rect(0, 0, w, h, fill=True, stroke=False)
        # gold top line
        canvas.setStrokeColor(GOLD)
        canvas.setLineWidth(2)
        canvas.line(36, h - 30, w - 36, h - 30)
        # footer
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(SECONDARY)
        canvas.drawCentredString(w / 2, 28,
            f"Unreel Estate  |  Galli Productions  —  Page {canvas.getPageNumber()}")


def gold_rule():
    return HRFlowable(
        width="100%", thickness=1, color=GOLD,
        spaceBefore=6, spaceAfter=12,
    )


def signature_block(labels):
    """Return a table with two signature areas side by side."""
    provider_label, client_label, date_label = labels
    line = "_" * 38

    data = [
        [
            Paragraph(f"<b>{provider_label}</b>", STYLES["body_bold"]),
            Paragraph(f"<b>{client_label}</b>", STYLES["body_bold"]),
        ],
        [
            Paragraph(f"{line}", STYLES["body_secondary"]),
            Paragraph(f"{line}", STYLES["body_secondary"]),
        ],
        [
            Paragraph(f"{date_label}: _______________", STYLES["body_secondary"]),
            Paragraph(f"{date_label}: _______________", STYLES["body_secondary"]),
        ],
    ]
    t = Table(data, colWidths=[3.3 * inch, 3.3 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


# ---------------------------------------------------------------------------
# CONTRACT CONTENT — ENGLISH
# ---------------------------------------------------------------------------
def content_en():
    S = STYLES
    elements = []

    # Logo
    if os.path.exists(LOGO_PATH):
        elements.append(Spacer(1, 12))
        elements.append(Image(LOGO_PATH, width=240, height=48))
        elements.append(Spacer(1, 18))

    elements.append(Paragraph("SERVICE AGREEMENT", S["title"]))
    elements.append(Paragraph("Unreel Estate by Galli Productions", S["subtitle"]))
    elements.append(gold_rule())

    # 1. PARTIES
    elements.append(Paragraph("1. PARTIES", S["h1"]))
    elements.append(Paragraph(
        "<b>Service Provider:</b> Galli Productions LLC, DBA Unreel Estate<br/>"
        "Address: [Address]<br/>"
        "EIN: [EIN]", S["body"]))
    elements.append(Paragraph(
        "<b>Client:</b> [Client Name]<br/>"
        "Company: [Client Company]<br/>"
        "Address: [Address]<br/>"
        "Email: [Email]", S["body"]))

    # 2. SCOPE OF SERVICES
    elements.append(Paragraph("2. SCOPE OF SERVICES", S["h1"]))
    elements.append(Paragraph(
        "The Service Provider agrees to deliver the following based on the selected package:", S["body"]))
    elements.append(Paragraph(
        "<b>Listing Package — $399</b><br/>"
        "- Up to 10 professionally edited photos<br/>"
        "- 1 cinematic property reel (30 seconds)<br/>"
        "- Optimized for MLS, social media, and web<br/>"
        "- Delivery within 48 hours of photo upload", S["body"]))
    elements.append(Paragraph(
        "<b>Signature Package — $599</b><br/>"
        "- Up to 20 professionally edited photos<br/>"
        "- 1 cinematic property reel (60 seconds)<br/>"
        "- Premium color grading and branding overlays<br/>"
        "- Optimized for MLS, social media, and web<br/>"
        "- Delivery within 48 hours of photo upload", S["body"]))
    elements.append(Paragraph(
        "All deliverables are digital. No physical products are included.", S["body_secondary"]))

    # 3. PAYMENT TERMS
    elements.append(Paragraph("3. PAYMENT TERMS", S["h1"]))
    elements.append(Paragraph(
        "- Full payment is required before production begins.<br/>"
        "- Payment is processed via Stripe (credit card or bank transfer).<br/>"
        "- All prices are in USD unless otherwise agreed in writing.<br/>"
        "- No hidden fees — the price is all-inclusive for the selected package.<br/>"
        "- Add-on services are charged separately as agreed by both parties.", S["body"]))

    # 4. CLIENT RESPONSIBILITIES
    elements.append(Paragraph("4. CLIENT RESPONSIBILITIES", S["h1"]))
    elements.append(Paragraph(
        "- Provide a minimum of 10 photos (Listing) or 15 photos (Signature).<br/>"
        "- Provide style preferences, target buyer information, and any special requests.<br/>"
        "- All photos must be owned by or licensed to the Client.<br/>"
        "- Respond to communications within 48 hours.", S["body"]))

    # 5. REVISIONS
    elements.append(Paragraph("5. REVISIONS", S["h1"]))
    elements.append(Paragraph(
        "- 1 round of revisions is included at no extra cost.<br/>"
        "- Additional revision rounds are charged at $50 each.<br/>"
        "- Revision requests must be submitted within 7 days of delivery.", S["body"]))

    # 6. INTELLECTUAL PROPERTY & USAGE RIGHTS
    elements.append(Paragraph("6. INTELLECTUAL PROPERTY &amp; USAGE RIGHTS", S["h1"]))
    elements.append(Paragraph(
        "- The Client receives full commercial usage rights for all deliverables.<br/>"
        "- The Client may use content for MLS listings, social media, websites, and print materials.<br/>"
        "- Unreel Estate retains the right to use deliverables in its portfolio, website, marketing materials, and case studies.<br/>"
        "- The Client may request exclusion from portfolio use in writing before production begins.", S["body"]))

    # 7. CONFIDENTIALITY
    elements.append(Paragraph("7. CONFIDENTIALITY", S["h1"]))
    elements.append(Paragraph(
        "- Both parties agree to keep confidential any proprietary information shared during the project.<br/>"
        "- Property details and client information will not be shared with third parties without prior written consent.", S["body"]))

    # 8. CANCELLATION & REFUNDS
    elements.append(Paragraph("8. CANCELLATION &amp; REFUNDS", S["h1"]))
    elements.append(Paragraph(
        "- Full refund if cancelled before production begins.<br/>"
        "- 50% refund if cancelled during production.<br/>"
        "- No refund after delivery of final files.<br/>"
        "- Cancellation must be communicated in writing (email).", S["body"]))

    # 9. LIABILITY
    elements.append(Paragraph("9. LIABILITY", S["h1"]))
    elements.append(Paragraph(
        "- Unreel Estate is not responsible for real estate sale outcomes.<br/>"
        "- Maximum liability is limited to the total amount paid for the service.<br/>"
        '- Content is provided "as is" after client-approved revisions.', S["body"]))

    # 10. GOVERNING LAW
    elements.append(Paragraph("10. GOVERNING LAW", S["h1"]))
    elements.append(Paragraph(
        "This agreement is governed by the laws of the State of Texas, United States.", S["body"]))

    # 11. SIGNATURES
    elements.append(Paragraph("11. SIGNATURES", S["h1"]))
    elements.append(Paragraph(
        "By signing below, both parties agree to the terms and conditions outlined in this Service Agreement.", S["body"]))
    elements.append(Spacer(1, 18))
    elements.append(signature_block(("Service Provider", "Client", "Date")))

    return elements


# ---------------------------------------------------------------------------
# CONTRACT CONTENT — ITALIAN
# ---------------------------------------------------------------------------
def content_it():
    S = STYLES
    elements = []

    if os.path.exists(LOGO_PATH):
        elements.append(Spacer(1, 12))
        elements.append(Image(LOGO_PATH, width=240, height=48))
        elements.append(Spacer(1, 18))

    elements.append(Paragraph("CONTRATTO DI SERVIZIO", S["title"]))
    elements.append(Paragraph("Unreel Estate di Galli Productions", S["subtitle"]))
    elements.append(gold_rule())

    # 1. PARTI
    elements.append(Paragraph("1. PARTI", S["h1"]))
    elements.append(Paragraph(
        "<b>Fornitore del Servizio:</b> Galli Productions LLC, DBA Unreel Estate<br/>"
        "Indirizzo: [Indirizzo]<br/>"
        "EIN: [EIN]", S["body"]))
    elements.append(Paragraph(
        "<b>Cliente:</b> [Nome del Cliente]<br/>"
        "Azienda: [Azienda del Cliente]<br/>"
        "Indirizzo: [Indirizzo]<br/>"
        "Email: [Email]", S["body"]))

    # 2. AMBITO DEI SERVIZI
    elements.append(Paragraph("2. AMBITO DEI SERVIZI", S["h1"]))
    elements.append(Paragraph(
        "Il Fornitore del Servizio si impegna a consegnare quanto segue in base al pacchetto selezionato:", S["body"]))
    elements.append(Paragraph(
        "<b>Pacchetto Listing — $399</b><br/>"
        "- Fino a 10 foto professionalmente elaborate<br/>"
        "- 1 reel cinematografico della propriet\u00e0 (30 secondi)<br/>"
        "- Ottimizzato per MLS, social media e web<br/>"
        "- Consegna entro 48 ore dal caricamento delle foto", S["body"]))
    elements.append(Paragraph(
        "<b>Pacchetto Signature — $599</b><br/>"
        "- Fino a 20 foto professionalmente elaborate<br/>"
        "- 1 reel cinematografico della propriet\u00e0 (60 secondi)<br/>"
        "- Color grading premium e overlay di branding<br/>"
        "- Ottimizzato per MLS, social media e web<br/>"
        "- Consegna entro 48 ore dal caricamento delle foto", S["body"]))
    elements.append(Paragraph(
        "Tutti i materiali consegnati sono digitali. Non sono inclusi prodotti fisici.", S["body_secondary"]))

    # 3. TERMINI DI PAGAMENTO
    elements.append(Paragraph("3. TERMINI DI PAGAMENTO", S["h1"]))
    elements.append(Paragraph(
        "- Il pagamento completo \u00e8 richiesto prima dell'inizio della produzione.<br/>"
        "- Il pagamento viene elaborato tramite Stripe (carta di credito o bonifico bancario).<br/>"
        "- Tutti i prezzi sono in USD salvo diverso accordo scritto.<br/>"
        "- Nessun costo nascosto — il prezzo \u00e8 tutto incluso per il pacchetto selezionato.<br/>"
        "- I servizi aggiuntivi vengono addebitati separatamente come concordato.", S["body"]))

    # 4. RESPONSABILITA DEL CLIENTE
    elements.append(Paragraph("4. RESPONSABILIT\u00c0 DEL CLIENTE", S["h1"]))
    elements.append(Paragraph(
        "- Fornire un minimo di 10 foto (Listing) o 15 foto (Signature).<br/>"
        "- Fornire preferenze di stile, informazioni sull'acquirente target e richieste speciali.<br/>"
        "- Tutte le foto devono essere di propriet\u00e0 del Cliente o concesse in licenza allo stesso.<br/>"
        "- Rispondere alle comunicazioni entro 48 ore.", S["body"]))

    # 5. REVISIONI
    elements.append(Paragraph("5. REVISIONI", S["h1"]))
    elements.append(Paragraph(
        "- 1 ciclo di revisioni \u00e8 incluso senza costi aggiuntivi.<br/>"
        "- Cicli di revisione aggiuntivi vengono addebitati a $50 ciascuno.<br/>"
        "- Le richieste di revisione devono essere presentate entro 7 giorni dalla consegna.", S["body"]))

    # 6. PROPRIETA INTELLETTUALE E DIRITTI D'USO
    elements.append(Paragraph("6. PROPRIET\u00c0 INTELLETTUALE E DIRITTI D'USO", S["h1"]))
    elements.append(Paragraph(
        "- Il Cliente riceve pieni diritti commerciali d'uso per tutti i materiali consegnati.<br/>"
        "- Il Cliente pu\u00f2 utilizzare i contenuti per annunci MLS, social media, siti web e materiali stampati.<br/>"
        "- Unreel Estate si riserva il diritto di utilizzare i materiali nel proprio portfolio, sito web, materiali di marketing e case study.<br/>"
        "- Il Cliente pu\u00f2 richiedere l'esclusione dall'uso nel portfolio per iscritto prima dell'inizio della produzione.", S["body"]))

    # 7. RISERVATEZZA
    elements.append(Paragraph("7. RISERVATEZZA", S["h1"]))
    elements.append(Paragraph(
        "- Entrambe le parti concordano di mantenere riservate le informazioni proprietarie condivise durante il progetto.<br/>"
        "- I dettagli della propriet\u00e0 e le informazioni del cliente non saranno condivisi con terze parti senza previo consenso scritto.", S["body"]))

    # 8. CANCELLAZIONE E RIMBORSI
    elements.append(Paragraph("8. CANCELLAZIONE E RIMBORSI", S["h1"]))
    elements.append(Paragraph(
        "- Rimborso completo se cancellato prima dell'inizio della produzione.<br/>"
        "- Rimborso del 50% se cancellato durante la produzione.<br/>"
        "- Nessun rimborso dopo la consegna dei file finali.<br/>"
        "- La cancellazione deve essere comunicata per iscritto (email).", S["body"]))

    # 9. RESPONSABILITA
    elements.append(Paragraph("9. RESPONSABILIT\u00c0", S["h1"]))
    elements.append(Paragraph(
        "- Unreel Estate non \u00e8 responsabile per gli esiti della vendita immobiliare.<br/>"
        "- La responsabilit\u00e0 massima \u00e8 limitata all'importo totale pagato per il servizio.<br/>"
        "- Il contenuto viene fornito \"cos\u00ec com'\u00e8\" dopo le revisioni approvate dal cliente.", S["body"]))

    # 10. LEGGE APPLICABILE
    elements.append(Paragraph("10. LEGGE APPLICABILE", S["h1"]))
    elements.append(Paragraph(
        "Il presente contratto \u00e8 regolato dalle leggi dello Stato del Texas, Stati Uniti.", S["body"]))

    # 11. FIRME
    elements.append(Paragraph("11. FIRME", S["h1"]))
    elements.append(Paragraph(
        "Con la firma sottostante, entrambe le parti accettano i termini e le condizioni descritti nel presente Contratto di Servizio.", S["body"]))
    elements.append(Spacer(1, 18))
    elements.append(signature_block(("Fornitore del Servizio", "Cliente", "Data")))

    return elements


# ---------------------------------------------------------------------------
# CONTRACT CONTENT — SPANISH
# ---------------------------------------------------------------------------
def content_es():
    S = STYLES
    elements = []

    if os.path.exists(LOGO_PATH):
        elements.append(Spacer(1, 12))
        elements.append(Image(LOGO_PATH, width=240, height=48))
        elements.append(Spacer(1, 18))

    elements.append(Paragraph("CONTRATO DE SERVICIO", S["title"]))
    elements.append(Paragraph("Unreel Estate de Galli Productions", S["subtitle"]))
    elements.append(gold_rule())

    # 1. PARTES
    elements.append(Paragraph("1. PARTES", S["h1"]))
    elements.append(Paragraph(
        "<b>Proveedor del Servicio:</b> Galli Productions LLC, DBA Unreel Estate<br/>"
        "Direcci\u00f3n: [Direcci\u00f3n]<br/>"
        "EIN: [EIN]", S["body"]))
    elements.append(Paragraph(
        "<b>Cliente:</b> [Nombre del Cliente]<br/>"
        "Empresa: [Empresa del Cliente]<br/>"
        "Direcci\u00f3n: [Direcci\u00f3n]<br/>"
        "Correo electr\u00f3nico: [Email]", S["body"]))

    # 2. ALCANCE DE LOS SERVICIOS
    elements.append(Paragraph("2. ALCANCE DE LOS SERVICIOS", S["h1"]))
    elements.append(Paragraph(
        "El Proveedor del Servicio se compromete a entregar lo siguiente seg\u00fan el paquete seleccionado:", S["body"]))
    elements.append(Paragraph(
        "<b>Paquete Listing — $399</b><br/>"
        "- Hasta 10 fotos editadas profesionalmente<br/>"
        "- 1 reel cinematogr\u00e1fico de la propiedad (30 segundos)<br/>"
        "- Optimizado para MLS, redes sociales y web<br/>"
        "- Entrega dentro de las 48 horas posteriores a la carga de fotos", S["body"]))
    elements.append(Paragraph(
        "<b>Paquete Signature — $599</b><br/>"
        "- Hasta 20 fotos editadas profesionalmente<br/>"
        "- 1 reel cinematogr\u00e1fico de la propiedad (60 segundos)<br/>"
        "- Correcci\u00f3n de color premium y superposiciones de marca<br/>"
        "- Optimizado para MLS, redes sociales y web<br/>"
        "- Entrega dentro de las 48 horas posteriores a la carga de fotos", S["body"]))
    elements.append(Paragraph(
        "Todos los entregables son digitales. No se incluyen productos f\u00edsicos.", S["body_secondary"]))

    # 3. TERMINOS DE PAGO
    elements.append(Paragraph("3. T\u00c9RMINOS DE PAGO", S["h1"]))
    elements.append(Paragraph(
        "- El pago completo es requerido antes del inicio de la producci\u00f3n.<br/>"
        "- El pago se procesa a trav\u00e9s de Stripe (tarjeta de cr\u00e9dito o transferencia bancaria).<br/>"
        "- Todos los precios est\u00e1n en USD a menos que se acuerde lo contrario por escrito.<br/>"
        "- Sin costos ocultos — el precio es todo incluido para el paquete seleccionado.<br/>"
        "- Los servicios adicionales se cobran por separado seg\u00fan lo acordado.", S["body"]))

    # 4. RESPONSABILIDADES DEL CLIENTE
    elements.append(Paragraph("4. RESPONSABILIDADES DEL CLIENTE", S["h1"]))
    elements.append(Paragraph(
        "- Proporcionar un m\u00ednimo de 10 fotos (Listing) o 15 fotos (Signature).<br/>"
        "- Proporcionar preferencias de estilo, informaci\u00f3n del comprador objetivo y solicitudes especiales.<br/>"
        "- Todas las fotos deben ser propiedad del Cliente o estar licenciadas al mismo.<br/>"
        "- Responder a las comunicaciones dentro de las 48 horas.", S["body"]))

    # 5. REVISIONES
    elements.append(Paragraph("5. REVISIONES", S["h1"]))
    elements.append(Paragraph(
        "- 1 ronda de revisiones est\u00e1 incluida sin costo adicional.<br/>"
        "- Las rondas de revisi\u00f3n adicionales se cobran a $50 cada una.<br/>"
        "- Las solicitudes de revisi\u00f3n deben enviarse dentro de los 7 d\u00edas posteriores a la entrega.", S["body"]))

    # 6. PROPIEDAD INTELECTUAL Y DERECHOS DE USO
    elements.append(Paragraph("6. PROPIEDAD INTELECTUAL Y DERECHOS DE USO", S["h1"]))
    elements.append(Paragraph(
        "- El Cliente recibe derechos comerciales completos de uso para todos los entregables.<br/>"
        "- El Cliente puede utilizar el contenido para listados MLS, redes sociales, sitios web y materiales impresos.<br/>"
        "- Unreel Estate se reserva el derecho de utilizar los entregables en su portafolio, sitio web, materiales de marketing y estudios de caso.<br/>"
        "- El Cliente puede solicitar la exclusi\u00f3n del uso en el portafolio por escrito antes del inicio de la producci\u00f3n.", S["body"]))

    # 7. CONFIDENCIALIDAD
    elements.append(Paragraph("7. CONFIDENCIALIDAD", S["h1"]))
    elements.append(Paragraph(
        "- Ambas partes acuerdan mantener confidencial cualquier informaci\u00f3n propietaria compartida durante el proyecto.<br/>"
        "- Los detalles de la propiedad y la informaci\u00f3n del cliente no se compartir\u00e1n con terceros sin consentimiento previo por escrito.", S["body"]))

    # 8. CANCELACION Y REEMBOLSOS
    elements.append(Paragraph("8. CANCELACI\u00d3N Y REEMBOLSOS", S["h1"]))
    elements.append(Paragraph(
        "- Reembolso completo si se cancela antes del inicio de la producci\u00f3n.<br/>"
        "- Reembolso del 50% si se cancela durante la producci\u00f3n.<br/>"
        "- Sin reembolso despu\u00e9s de la entrega de los archivos finales.<br/>"
        "- La cancelaci\u00f3n debe comunicarse por escrito (correo electr\u00f3nico).", S["body"]))

    # 9. RESPONSABILIDAD
    elements.append(Paragraph("9. RESPONSABILIDAD", S["h1"]))
    elements.append(Paragraph(
        "- Unreel Estate no es responsable de los resultados de la venta inmobiliaria.<br/>"
        "- La responsabilidad m\u00e1xima se limita al monto total pagado por el servicio.<br/>"
        "- El contenido se proporciona \"tal cual\" despu\u00e9s de las revisiones aprobadas por el cliente.", S["body"]))

    # 10. LEY APLICABLE
    elements.append(Paragraph("10. LEY APLICABLE", S["h1"]))
    elements.append(Paragraph(
        "Este contrato se rige por las leyes del Estado de Texas, Estados Unidos.", S["body"]))

    # 11. FIRMAS
    elements.append(Paragraph("11. FIRMAS", S["h1"]))
    elements.append(Paragraph(
        "Al firmar a continuaci\u00f3n, ambas partes aceptan los t\u00e9rminos y condiciones descritos en este Contrato de Servicio.", S["body"]))
    elements.append(Spacer(1, 18))
    elements.append(signature_block(("Proveedor del Servicio", "Cliente", "Fecha")))

    return elements


# ---------------------------------------------------------------------------
# BUILD PDF
# ---------------------------------------------------------------------------
def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.7 * inch,
        bottomMargin=0.7 * inch,
    )

    story = []
    story.extend(content_en())
    story.append(PageBreak())
    story.extend(content_it())
    story.append(PageBreak())
    story.extend(content_es())

    doc.build(story,
              onFirstPage=NumberedCanvas.draw_page,
              onLaterPages=NumberedCanvas.draw_page)

    print(f"PDF generated: {OUTPUT_PATH}")
    print(f"Size: {os.path.getsize(OUTPUT_PATH):,} bytes")


if __name__ == "__main__":
    build_pdf()
