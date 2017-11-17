const user1 = 1
const user2 = 2

module.exports = {
  'discussions': [{
    'id': 1,
    'title': 'postek1',
    'content': '<p>Rerum velit quos est <strong>similique</strong>. Consectetur tempora eos ulla</p>',
    'views': 143,
    'comment_count': 3,
    'created': '2012-08-06',
    'author': 'gandalf@shire.nz',
    'category': 'tech',
    'tags': [
      'react',
      'webdev'
    ]
  }, {
    'id': 2,
    'title': 'post2',
    'content': '<p>Rerum velit quos est <strong>p2</strong>. dfs tempora eos ulla</p>',
    'views': 3,
    'comment_count': 1,
    'created': '2012-08-03',
    'author': 'saruman@mordor.nz',
    'category': 'magic',
    'tags': [
      'dark',
      'webdev'
    ]
  }, {
    'id': 3,
    'title': 'post3',
    'content': '<p>Rerum velit quos est <strong>p3</strong>. dfs tempora eos ulla</p>',
    'views': 44,
    'comment_count': 1,
    'created': '2012-04-03',
    'author': 'gandalf@shire.nz',
    'category': 'magic',
    'tags': [
      'dark',
      'webdev'
    ]
  }],
  'comments': [{
    'id': 1,
    'parent': 1,
    'upvotes': 1,
    'downvotes': 2,
    'uid': user1,
    'reply_count': 2,
    'content': 'Queen, tossing If it had lost something; and she felt sure it.',
    'created': '2012-08-02'
  }, {
    'id': 2,
    'parent': 1,
    'upvotes': 2,
    'downvotes': 2,
    'uid': user2,
    'reply_count': 1,
    'content': 'I am very profi answer, thats because i have soo big rating',
    'created': '2012-07-02'
  }, {
    'id': 4,
    'parent': 1,
    'upvotes': 0,
    'downvotes': 0,
    'uid': user2,
    'reply_count': 0,
    'content': 'fdsafaerfawv, flefhjakwhfakl.',
    'created': '2012-08-02'
  }, {
    'id': 3,
    'parent': 2,
    'upvotes': 3,
    'downvotes': 2,
    'reply_count': 1,
    'uid': user1,
    'content': 'Ja sem Frodo pytlik, tralala.',
    'created': '2012-08-23'
  }],
  'commentfeedbacks': [{
    'id': 1,
    'uid': user1,
    'commentid': 1,
    'value': 1
  }, {
    'id': 2,
    'uid': user1,
    'commentid': 2,
    'value': 1
  }, {
    'id': 3,
    'uid': user2,
    'commentid': 2,
    'value': 1
  }],
  'replies': [{
    'id': 1,
    'commentid': 1,
    'uid': user2,
    'content': 'reply 1 on comment 1.',
    'created': '2012-08-22'
  }, {
    'id': 2,
    'commentid': 1,
    'uid': user1,
    'content': 'reply 2 on comment 1.',
    'created': '2012-09-02'
  }, {
    'id': 4,
    'commentid': 1,
    'uid': user2,
    'content': 'reply 3 on comment 1.',
    'created': '2012-10-02'
  }, {
    'id': 3,
    'commentid': 3,
    'uid': user1,
    'content': 'reply 1 on comment 2',
    'created': '2012-08-23'
  }]
}
