import { CSSProperties } from "react"

export const container: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
}

export const editor: CSSProperties = {
    width: '80%',
    height: '90%',
    backgroundColor: '#fff',
    border: '1px solid #aaa',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
}

export const buttonRow: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const form: CSSProperties = {
    marginBottom: '10px',
}