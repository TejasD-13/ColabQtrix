interface FooterLink {
  label: string;
  href: string;
}

interface FooterContact {
  address: string;
  email: string;
  phone: string;
}

interface FooterSectionProps {
  componentId?: string;
  about: string;
  companyLinks: FooterLink[];
  contact: FooterContact;
  copyright: string;
  _sectionId?: number;
}

export default function FooterSection({
  about,
  companyLinks,
  contact,
  copyright,
}: FooterSectionProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-white text-xl">ColabQtrix Technologies</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">{about}</p>
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-white text-xs"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>{contact.address}</span>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>📧</span> {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>📞</span> {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">{copyright}</p>
          <a
            href="#home"
            className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
