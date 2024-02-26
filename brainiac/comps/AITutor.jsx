import { useEffect, useState } from "react";

function AITutor() {
  const [link, setLink] = useState(
    "https://www.youtube.com/embed/A1uqgEz3hB0?si=kkicjm2FewM7XZ3T"
  );
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState({});
  // const [summary, setSummary] = useState("Summary DEMO");
  const [summary, setSummary] = useState(null);
  const [newKey, setNewKey] = useState('')  
  const [newValue, setNewValue] = useState('')  
  const [transcript, setTranscript] = useState('Transcript DEMO')  ;

  const handlePrompt = () => {

    console.log(prompt)
    console.log(history)

    fetch(`http://127.0.0.1:8000/video/chats`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        history: history
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary);
        setHistory(prevHistory => ({
          ...prevHistory,
          [newKey]: newValue
        }))
      });

  };

  // useEffect(()=>{
  //   setHistory({ [transcript] :  summary})
  //   console.log(history)
  // },[])

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/video/summary`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        urlink: link,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA  ", data)
        if(data.error){
          alert("Rate limit exceeded for hugging face model")
        }

        setSummary(data.summary);
        setNewKey(data.transcript)
        setNewValue(data.summary)
        setHistory(prevHistory => ({
          ...prevHistory,
          [newKey]: newValue
        }))
      });
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <iframe
        width="560"
        height="315"
        src={link}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe> */}
      {summary}
      <br />
      <br />
      <br />
      <textarea onChange={(e) => setPrompt(e.target.value)} /> <br />
      <br />
      {/* <button onClick={handlePrompt}>Send</button> */}
      {/* <button onClick={()=>{console.log(history)}}>Send</button> */}
    </>
  );
}

export default AITutor;
