import { CSSProperties } from "react";

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

export const title: CSSProperties = {
    fontWeight: 'bold',
    fontSize: '16px'
}

export const buttonRow: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse'
}

export const inputArea: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}