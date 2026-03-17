'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Mail, Phone } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

interface NavBarProps {
  componentId?: string
  logo: { text: string; icon: string }
  links: NavLink[]
  contactInfo: { email: string; phone: string }
  _sectionId?: number
}

export default function NavBar({ logo, links, contactInfo, _sectionId }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-2">
          <nav className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center gap-3">

                {/* Hardcoded logo */}
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-lg font-semibold text-gray-700">
                  {logo.text}
                </span>
              </Link>

              {/* Desktop Links */}
              <ul className="hidden md:flex items-center gap-8">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setActiveLink(link.label)}
                      className={`text-[15px] font-medium relative pb-1 ${activeLink === link.label
                        ? 'text-gray-900 border-b-2 border-gray-400'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Contact */}
            <div className="hidden md:flex items-center text-sm text-gray-600 gap-2">
              <a href={`mailto:${contactInfo.email}`} className="hover:text-gray-900 transition">
                {contactInfo.email}
              </a>
              <span className="text-gray-400">|</span>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-gray-900 transition">
                {contactInfo.phone}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-primary transition"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>

          </nav>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMenu}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">

            <div className="relative w-9 h-9">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>

            <span className="font-semibold text-gray-800 text-sm">
              {logo.text}
            </span>
          </Link>

          <button
            onClick={closeMenu}
            className="p-1.5 rounded text-gray-500 hover:text-primary transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-8">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label)
                    closeMenu()
                  }}
                  className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition ${activeLink === link.label
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info */}
        <div className="px-6 py-6 border-t border-gray-100 space-y-3">

          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary"
          >
            <Mail size={15} />
            {contactInfo.email}
          </a>

          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary"
          >
            <Phone size={15} />
            {contactInfo.phone}
          </a>

        </div>
      </aside>
    </>
  )
}