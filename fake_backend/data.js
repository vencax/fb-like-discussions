module.exports = {
  "discussions": [{
    "id": 1,
    "title": "postek1",
    "body": "<p>Rerum velit quos est <strong>similique</strong>. Consectetur tempora eos ulla</p>",
    "views": 143,
    "comment_count": 3,
    "created": "2012-08-06",
    "author": "gandalf@shire.nz",
    "category": "tech",
    "tags": [
      "react",
      "webdev"
    ]
  }, {
    "id": 2,
    "title": "post2",
    "body": "<p>Rerum velit quos est <strong>p2</strong>. dfs tempora eos ulla</p>",
    "views": 3,
    "comment_count": 0,
    "created": "2012-08-03",
    "author": "saruman@mordor.nz",
    "category": "magic",
    "tags": [
      "dark",
      "webdev"
    ]
  }, {
    "id": 3,
    "title": "post3",
    "body": "<p>Rerum velit quos est <strong>p3</strong>. dfs tempora eos ulla</p>",
    "views": 44,
    "comment_count": 1,
    "created": "2012-04-03",
    "author": "gandalf@shire.nz",
    "category": "magic",
    "tags": [
      "dark",
      "webdev"
    ]
  }],
  "comments": [{
    "id": 1,
    "parent": 1,
    "rating": 1,
    "author": "frodo@shire.nz",
    "reply_count": 2,
    "body": "Queen, tossing 'If it had lost something; and she felt sure it.",
    "created": "2012-08-02"
  }, {
    "id": 2,
    "parent": 1,
    "rating": 2,
    "author": "Sigurd O'Conner",
    "reply_count": 1,
    "body": "I am very profi answer, that's because i have soo big rating",
    "created": "2012-07-02"
  }, {
    "id": 3,
    "parent": 3,
    "rating": 4,
    "reply_count": 0,
    "author": "frodo@shire.nz",
    "body": "Ja sem Frodo pytlik, tralala.",
    "created": "2012-08-23"
  }],
  "commentfeedbacks": [{
    "id": 1,
    "uid": 3,
    "commentid": 1,
    "feedback": 1
  }, {
    "id": 2,
    "uid": 3,
    "commentid": 2,
    "feedback": 1
  }, {
    "id": 3,
    "uid": 33,
    "commentid": 2,
    "feedback": 1
  }],
  "replies": [{
    "id": 1,
    "commentid": 1,
    "author": "frodo@shire.nz",
    "body": "reply 1 on comment 1.",
    "created": "2012-08-22"
  }, {
    "id": 2,
    "commentid": 1,
    "author": "Sigurd O'Conner",
    "body": "reply 2 on comment 1.",
    "created": "2012-09-02"
  }, {
    "id": 3,
    "commentid": 2,
    "author": "frodo@shire.nz",
    "body": "reply 1 on comment 2",
    "created": "2012-08-23"
  }],
}
