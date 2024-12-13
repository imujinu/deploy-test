// const Visitor = require("../model/Visitior");
const { BOOLEAN } = require("sequelize");
const models = require("../models");
const { errorlogs } = require("../utils/common");
/* /GET */

exports.main = (req, res) => {
  res.render("index");
};

/* /visitors GET */

exports.getVisitors = (req, res) => {
  // DB 연걸전
  //   console.log(Visitor.getVisitors());
  //   res.render("visitors", { data: Visitor.getVisitors() });
  // [DB 연결 후, sequelize 이전]
  // Visitor.getVisitors((result) => {
  //   console.log("전체목록 Cvisitor.js", result);
  //   res.render("visitors", { data: result });
  // });

  // [Sequelize 이후]
  // "SELECT * FROM visitor"

  models.Visitor.findAll()
    .then((result) => {
      console.log("findall", result);
      //  findAll의 결과는 배열
      // res.send(result);
      res.render("visitors", { data: result });
    })
    .catch((err) => {
      console.log("getVisitors Controller Err", err);
      res.status(500).send("server err!");
    }); // sequelize는 promise를 제공한다
};

/* /visitor/:id GET */
exports.getvistior = async (req, res) => {
  // Visitor.getVisitor()
  console.log(req.params);
  console.log(req.params.id);

  // [db 연결 후 Sequelize 이전]
  // const id = req.params.id;
  // Visitor.getVisitor(id, (result) => {
  //   console.log("한개의 데이터 Cvisitor.js", result);
  //   res.send(result);
  // });

  //[sequelize 이후]
  // `SELECT * FROM visitor WHERE id=${id}`
  try {
    const result = await models.Visitor.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("findone>>", result);
    res.send(result);
    /* 데이터를 객체로 받아오고 있다. findone은 하나만 찾아오기 때문이다.
     dataValues: { id: 1, name: 'ccccsdsd', comment: 'ccㅇㄹ' },
  _previousDataValues: { id: 1, name: 'ccccsdsd', comment: 'ccㅇㄹ' },
  uniqno: 1,
  _changed: Set(0) {},
  _options: {
    isNewRecord: false,
    _schema: null,
    _schemaDelimiter: '',
    raw: true,
    attributes: [ 'id', 'name', 'comment' ]
  },
  isNewRecord: false
}
    */
  } catch (err) {
    console.log("err", err);
    res.status(500).send("internal server error");
  }
};

/* /visitor POST 등록 INSERT INTO*/
exports.postVisitor = (req, res) => {
  console.log(req.body);

  //[sequelize 이전]
  // Visitor.postVisitor(req.body, (result) => {
  //   console.log("Cvisitor js", result);
  //   res.send({ id: result, comment: req.body.comment, name: req.body.name });
  // });

  // [sequelize 이후]
  //`INSERT INTO visitor VALUE(null,"${data.name}","${data.comment}")`

  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
      /* 
       dataValues: { id: 15, name: '임진우', comment: '짱짱' },
  _previousDataValues: { name: '임진우', comment: '짱짱', id: 15 },
  uniqno: 1,
  _changed: Set(0) {},
  _options: {
    isNewRecord: true,
    _schema: null,
    _schemaDelimiter: '',
    attributes: undefined,
    include: undefined,
    raw: undefined,
    silent: undefined */
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("server error");
    });
};
/* /visitor DELETE 삭제 DELET FROM*/
exports.deleteVisitor = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 id 삭제완료");
  // });

  //[sequelize 이후]
  //conn.query(`DELETE FROM visitor WHERE id=${id}`
  try {
    const result = await models.Visitor.destroy({
      where: {
        id: req.body.id,
      },
    });
    console.log(result);
    // 1(삭제 성공), 0 (삭제 실패 - 없는 데이터를 삭제하려고 할 때  )
    // true , false
    if (Boolean(result)) {
      // Number to Boolean
      res.send(req.body.id + "번 id 삭제완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch {
    console.log((err) => {
      console.log("err", error);
      res.status(500).send("internal server error ");
    });
  }
};
/* /visitor PATCH 수정 UPDATE SET*/

exports.patchVisitor = async (req, res) => {
  console.log(req.body);
  //[sequelize 전]
  // Visitor.patchVisitor(req.body, () => {
  //   res.send("수정 완료");
  // });

  // [sequelize 후]
  //`UPDATE visitor SET name="${data.name}",
  // comment="${data.comment}" WHERE id=${data.id}  `,
  const [result] = await models.Visitor.update(
    {
      name: req.body.name,
      comment: req.body.comment,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  try {
    console.log(result);
    // [1] , [0]
    // const [number] = result;
    // console.log(number);

    if (Boolean(result)) {
      res.send("수정완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch {
    errorlogs(res, err, "patch controller 내부", "수정 에러가 났어요", 500);
  }
};
