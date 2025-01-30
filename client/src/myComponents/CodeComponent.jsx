import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
const CodeComponent = ({ ...props }) => {
    return (
        <div className='prose mx-auto'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ children, ...props }) {
                        return (
                            <SyntaxHighlighter
                                language='javascript' // Always use JavaScript
                                style={oneDark}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        )
                    }
                }}
            >
                {props.markdownContent}
            </ReactMarkdown>
        </div>
    )
}

export default CodeComponent
