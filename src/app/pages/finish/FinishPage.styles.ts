import { CSSProperties } from "react"

export const mainStyle: CSSProperties = {
    backgroundColor: '#ddd',
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
}

export const mainArea: CSSProperties = {
    width: '40vw',
    height: '40vh',
    backgroundColor: 'white',
    border: '1px solid #aaa',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

export const textRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
}

export const text: CSSProperties = {
    fontWeight: 'bold',
    fontSize: '20px'
}

export const iconRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
}

export const icon: CSSProperties = {
    fontSize: '100px',
    color: '#95de64'
}

export const buttonRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end'
}