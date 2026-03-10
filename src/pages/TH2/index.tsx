import React, { useState, useEffect } from "react";

interface Question {
  id: number;
  subject: string;
  knowledge: string;
  level: string;
  content: string;
}

export default function QuestionManager() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const data = localStorage.getItem("questions");
    return data ? JSON.parse(data) : [];
  });

  const [subject, setSubject] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [level, setLevel] = useState("Dễ");
  const [content, setContent] = useState("");

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      subject,
      knowledge,
      level,
      content,
    };

    setQuestions([...questions, newQuestion]);

    setSubject("");
    setKnowledge("");
    setContent("");
  };

  const createExam = () => {
    const exam = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

    alert("Đề thi:\n\n" + exam.map((q) => q.content).join("\n\n"));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Ngân Hàng Câu Hỏi</h1>

      <div style={styles.form}>
        <input
          placeholder="Môn học"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Khối kiến thức"
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
          style={styles.input}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={styles.input}
        >
          <option>Dễ</option>
          <option>Trung bình</option>
          <option>Khó</option>
          <option>Rất khó</option>
        </select>

        <textarea
          placeholder="Nội dung câu hỏi"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <div>
          <button onClick={addQuestion} style={styles.addBtn}>
            ➕ Thêm câu hỏi
          </button>

          <button onClick={createExam} style={styles.examBtn}>
            📝 Tạo đề thi
          </button>
        </div>
      </div>

      <h2>Danh sách câu hỏi</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Môn</th>
            <th>Khối</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.subject}</td>
              <td>{q.knowledge}</td>
              <td>{q.level}</td>
              <td>{q.content}</td>
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
    background: "#f1f2f6",
    borderRadius: 10,
  },

  title: {
    textAlign: "center",
  },

  form: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  textarea: {
    width: "100%",
    height: 80,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 10,
  },

  addBtn: {
    padding: "10px 20px",
    marginRight: 10,
    background: "#2ed573",
    border: "none",
    color: "white",
    borderRadius: 6,
    cursor: "pointer",
  },

  examBtn: {
    padding: "10px 20px",
    background: "#3742fa",
    border: "none",
    color: "white",
    borderRadius: 6,
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
  },
};