import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { WhatsAppIcon } from './BrandIcons'
import { whatsapp, ease } from '../../lib/site'

/** Appears once the hero CTAs leave the screen, so a contact is always one tap away. */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > window.innerHeight * 0.8))

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Empirium Labs no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          whileTap={{ scale: 0.92, transition: { duration: 0.12, ease: ease.out } }}
          className="fixed right-4 bottom-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-mint text-navy shadow-[0_10px_30px_-6px_rgb(53_214_194/0.7)] transition-[filter] duration-200 hover:brightness-110 sm:right-6 sm:bottom-6"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
