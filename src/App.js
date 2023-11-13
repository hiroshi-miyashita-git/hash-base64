import { useState }               from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import   CryptoJS                 from 'crypto-js';

function App() {
  const gazo1 = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
  const gazo2 = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16"><path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/></svg>
  const gazo3 = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg>

  const [plainText,     setPlainText    ] = useState("");     // ハッシュ化する文字列
  const [himitsuKagi,   setHimitsuKagi  ] = useState("");     // 秘密鍵
  const [hashText,      setHashText     ] = useState("");     // ハッシュ値
  const [textToEncode,  setTextToEncode ] = useState("");     // Base64エンコードする文字列
  const [base64Text,    setBase64Text   ] = useState("");     // Base64エンコード値
  const [imgCopyHash,   setImgCopyHash  ] = useState(gazo1);  // ハッシュ値コピー用のアイコン
  const [imgCopyBase64, setImgCopyBase64] = useState(gazo1);  // Base64エンコード値コピー用のアイコン
  const [copiedHash,    setCopiedHash   ] = useState(false);  // ハッシュ値コピーの状態
  const [copiedBase64,  setCopiedBase64 ] = useState(false);  // Base64エンコード値コピーの状態

  // 秘密鍵の入力値が変わった場合、ハッシュ値を取得して設定する。
  const onChangeHimitsuKagi = (key) => {
    setHimitsuKagi(key);
    setHashText(CryptoJS.HmacSHA256(plainText, key).toString(CryptoJS.enc.Hex));
  }

  // ハッシュ化する文字列の入力値が変わった場合、ハッシュ値を取得して設定する。
  const onChangePlainText = (data) => {
    setPlainText (data);
    setHashText(CryptoJS.HmacSHA256(data, himitsuKagi).toString(CryptoJS.enc.Hex));
  }

  // Base64エンコードする文字列の入力値が変わった場合、Base64エンコードして設定する。
  const onChangeTextToEncode = (plainText) => {
    setTextToEncode(plainText);
    setBase64Text(btoa(plainText));
  }

  // ゴミ箱アイコンがクリックされた場合は、入力欄、ハッシュ値とBase64エンコード値のコピー状態、クリップボードをクリアする。
  const onClickClearValue = () => {
    setPlainText("");
    setHimitsuKagi("");
    setHashText("");
    setTextToEncode("");
    setBase64Text("");
    setImgCopyHash(gazo1);
    setImgCopyBase64(gazo1);
    setCopiedHash(false);
    setCopiedBase64(false);
    navigator.clipboard.writeText("");
  }

  //ハッシュ値のコピーアイコンがクリックされた場合、ハッシュ値をコピー・クリアして、アイコンを切り替える。
  const onClickCopyHash = () => {
    if(imgCopyHash.props.className === gazo1.props.className) {
      setImgCopyHash(gazo2);
      setCopiedHash(true);
      navigator.clipboard.writeText(hashText);
    }else{
      setImgCopyHash(gazo1);
      setCopiedHash(false);
      navigator.clipboard.writeText("");
    }
  }

  //base64エンコード値のコピーアイコンがクリックされた場合、base64エンコード値をコピー・クリアして、アイコンを切り替える。
  const onClickCopyBase64 = () => {
    if(imgCopyBase64.props.className === gazo1.props.className) {
      setImgCopyBase64(gazo2);
      setCopiedBase64(true);
      navigator.clipboard.writeText(base64Text);
    }else{
      setImgCopyBase64(gazo1);
      setCopiedBase64(false);
      navigator.clipboard.writeText("");
    }
  }

  return (
    <div>
      <HelmetProvider>
      <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Source+Code+Pro&family=Noto+Serif+JP&display=swap" rel="stylesheet" />
      </Helmet>
      
      <table>
      <caption><h1>ハッシュ値取得 ＆ Base64エンコード<label onClick={onClickClearValue}>{gazo3}</label></h1></caption>
      <thead></thead><tbody><tr><td>

      <p>ハッシュ化する文字列<br />
      <input value={plainText}   className="input" onChange={(event) => onChangePlainText(event.target.value) } /></p>
        
      <p>秘密鍵<br />
      <input value={himitsuKagi} className="input" onChange={(event) => onChangeHimitsuKagi(event.target.value) } /></p>

      <p><b>ハッシュ値（HMAC/SHA256）</b>
      <label onClick={onClickCopyHash}>{imgCopyHash}</label>
      {copiedHash && (<span className="copied">Copied</span>)}<br />
      <textarea value={hashText} className="hash" readOnly /></p>

      </td><td></td><td></td><td>
      
      <p>エンコードする文字列<br />
      <textarea value={textToEncode} className="textarea" onChange={(event) => onChangeTextToEncode(event.target.value)} /></p>

      <p className="base64TextP"><b>Base64エンコード値</b>
      <label onClick={onClickCopyBase64}>{imgCopyBase64}</label>
      {copiedBase64 && (<span className="copied">Copied</span>)}<br />
      <textarea value={base64Text} className="base64" readOnly /></p>

      </td></tr></tbody></table>
      </HelmetProvider>
    </div>
  );
}
export default App;
