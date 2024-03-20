import styles from './EmailEditor.module.scss'
import parse from 'html-react-parser'
import { ToolsButtons } from './tools-buttons/ToolsButtons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { emailService } from '../../services/email.service'
import { useEditor } from '../../hooks/useEditor'

export function EmailEditor() {
  const { text, textRef, setText, applyFormat, updateSelection } = useEditor()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['create email'],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess() {
      setText('')
      queryClient.refetchQueries({ queryKey: ['email list'] })
    },
  })

  return (
    <div>
      <h1>Email editor</h1>
      {text && <div className={styles.preview}>{parse(text)}</div>}

      <div className={styles.card}>
        <textarea
          ref={textRef}
          className={styles.editor}
          spellCheck="false"
          value={text}
          onSelect={updateSelection}
          onChange={e => setText(e.target.value)}
        />

        <div className={styles.actions}>
          <ToolsButtons setText={setText} applyFormat={applyFormat} />

          <button disabled={isPending} onClick={() => mutate()}>
            Send now
          </button>
        </div>
      </div>
    </div>
  )
}
