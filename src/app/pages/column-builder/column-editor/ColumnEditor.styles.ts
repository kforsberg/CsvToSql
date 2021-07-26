import { CSSProperties } from "react";

export const container: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
}

export const editor: CSSProperties = {
    width: '70%',
    height: '50%',
    backgroundColor: '#fff',
    border: '1px solid #aaa',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
}

export const buttonRow: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const headerRow: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
}

export const inputContainer: CSSProperties = {
    width: '200px'
}

export const inputArea: CSSProperties = {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '100%',
    alignItems: 'center',
    borderTop: '1px solid #eee'
}

export const label: CSSProperties = {
    display: 'block'
}

export const selectStyle: CSSProperties = {
    width: '100%'
}