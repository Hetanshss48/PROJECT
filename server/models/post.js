const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS posts (
    postID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    postContent LONGTEXT NOT NULL,
    CONSTRAINT postPK PRIMARY KEY(postID),
    CONSTRAINT userFK FOREIGN KEY(userID) REFERENCES users(userID)
  );`;

  await con.query(sql);
}

createTable();

async function getAllPosts(postbody) {
  let sql = `SELECT * FROM posts WHERE userID = ${postbody.userID};`;

  return await con.query(sql);
}
async function editPost(post) {
  let sql = `
      UPDATE posts 
      SET postContent = "${post.postContent}"
      WHERE postID = ${post.postID};
    `;
  await con.query(sql);
}
async function deletePost(post) {
  let sql = `
          DELETE FROM posts
          WHERE postID = ${post.postID}
        `;
  await con.query(sql);
}

async function add(post) {
  let sql = `
          INSERT INTO posts(postContent,userID)
          VALUES ("${post.postcontent}","${post.userID}");
        `;
  await con.query(sql);
}

module.exports = { getAllPosts, editPost, deletePost, add };
