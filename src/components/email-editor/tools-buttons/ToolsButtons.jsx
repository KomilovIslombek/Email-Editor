import { Bold, Eraser, Italic, Underline } from 'lucide-react'
import styles from './ToolsButtons.module.scss'

// Editor Text
export const TEXT = `Enter email...`

// Icons
const ICONS = {
  eraser: <Eraser size={17} />,
  bold: <Bold size={17} />,
  italic: <Italic size={17} />,
  underline: <Underline size={17} />,
}

export function ToolsButtons({ setText, applyFormat }) {
  return (
    <div className={styles.tools}>
      {Object.keys(ICONS)?.map((iconType, key) => (
        <button
          onClick={() =>
            iconType === 'eraser' ? setText('') : applyFormat(iconType)
          }
          key={key}
        >
          {ICONS[iconType]}
        </button>
      ))}
    </div>
  )
}
