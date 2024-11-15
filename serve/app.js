const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const db = require("./db");
const login = require("./login");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/list", (req, res) => {
  const { search, page = 1, size = 10 } = req.query;
  db.query(
    `select id, fileName, type, details, modified, DATE_FORMAT(date, '%Y-%m-%d') as date, location from a_test
    where fileName like '%${search}%' or details like '%${search}%'
    order by date
    limit ${size} offset ${(page - 1) * size};
    select count(*) from a_test
    where fileName like '%${search}%' or details like '%${search}%'
    `,
    (err, user) => {
      if (err) {
        res.send(err);
      } else {
        const [list, [{ "count(*)": total }]] = user;
        const response = {
          total,
          list,
          page: Number(page),
          size: Number(size),
          totalPage: Math.ceil(total / Number(size)),
        };
        res.send(response);
      }
    }
  );
});

app.post("/login", async (req, res) => {
  if (!req.body.code) {
    throw new Error("必填参数不能为空！");
  }
  try {
    const userInfo = await login(req.body.code);
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
