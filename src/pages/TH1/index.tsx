import React, { useState, useEffect } from "react";

type Choice = "Kéo" | "Búa" | "Bao";

interface Result {
  player: Choice;
  computer: Choice;
  result: string;
}

export default function RockPaperScissors() {
  const choices: Choice[] = ["Kéo", "Búa", "Bao"];

  const [history, setHistory] = useState<Result[]>(() => {
    const data = localStorage.getItem("rps_history");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("rps_history", JSON.stringify(history));
  }, [history]);

  const play = (playerChoice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) result = "Hòa";
    else if (
      (playerChoice === "Kéo" && computerChoice === "Bao") ||
      (playerChoice === "Búa" && computerChoice === "Kéo") ||
      (playerChoice === "Bao" && computerChoice === "Búa")
    )
      result = "Thắng";
    else result = "Thua";

    setHistory([{ player: playerChoice, computer: computerChoice, result }, ...history]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Trò Chơi Oẳn Tù Tì</h1>

      <div style={styles.buttonGroup}>
        {choices.map((c) => (
          <button key={c} onClick={() => play(c)} style={styles.button}>
            {c}
          </button>
        ))}
      </div>

      <h2 style={{ marginTop: 30 }}>📜 Lịch Sử Trận Đấu</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Máy</th>
            <th>Kết quả</th>
          </tr>
        </thead>

        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
              <td>{h.player}</td>
              <td>{h.computer}</td>
              <td
                style={{
                  color:
                    h.result === "Thắng"
                      ? "green"
                      : h.result === "Thua"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {h.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: any = {
  container: {
    padding: 30,
    background: "linear-gradient(135deg,#74ebd5,#ACB6E5)",
    borderRadius: 10,
    marginBottom: 40,
  },

  title: {
    textAlign: "center",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },

  button: {
    padding: "15px 30px",
    fontSize: 18,
    borderRadius: 10,
    border: "none",
    background: "#ff7675",
    color: "white",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    marginTop: 20,
    borderCollapse: "collapse",
    background: "white",
  },
};