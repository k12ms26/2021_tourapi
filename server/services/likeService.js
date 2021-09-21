const db = require('../database/database');
const mysql = require('mysql2');

exports.createLikePlace = async (user_pk, place_pk) => {
    const query = `INSERT IGNORE INTO like_place (user_pk, place_pk) 
                   VALUES (${user_pk}, ${place_pk})`;

    const result = await db.query(query);

    return result ? true : false;
}

exports.createLikeCollection = async (user_pk, collection_pk) => {
    const query = `INSERT IGNORE INTO like_collection (user_pk, collection_pk) 
                   VALUES (${user_pk}, ${collection_pk})`;

    const result = await db.query(query);

    return result ? true : false;
}

exports.readLikePlace = async (user_pk) => {
    // TODO 나중에 별점 추가

    const query = `SELECT p.place_pk, place_name, place_addr, place_img, place_type 
                   FROM places p
                   INNER JOIN like_place lp
                   ON lp.user_pk = ${user_pk}
                   AND lp.place_pk = p.place_pk
                   ORDER BY lp.like_pk DESC
                   `
    const result = await db.query(query);
    return result;
}

exports.readLikeCollection = async (user_pk) => {
    const query = `SELECT c.collection_pk, collection_name, collection_type, collection_thumbnail, collection_private, user_nickname AS created_user_name, IFNULL(place_cnt, 0) AS place_cnt, IFNULL(like_cnt, 0) AS like_cnt
                   FROM collections c
                   INNER JOIN users u
                   ON u.user_pk = c.user_pk
                   INNER JOIN like_collection lcn
                   ON lcn.user_pk = ${user_pk}
                   AND lcn.collection_pk = c.collection_pk
                   LEFT OUTER JOIN (SELECT collection_pk, COUNT(*) AS place_cnt FROM collection_place_map GROUP BY collection_pk) cpm
                   ON cpm.collection_pk = c.collection_pk
                   LEFT OUTER JOIN (SELECT collection_pk, COUNT(*) AS like_cnt FROM like_collection GROUP BY collection_pk) lc 
                   ON lc.collection_pk = c.collection_pk
                   ORDER BY lcn.like_pk DESC
                   `
    const result = await db.query(query);
    return result;
}

exports.deleteLikePlace = async (user_pk, place_pk) => {
    const query = `DELETE FROM like_place 
                   WHERE user_pk=${user_pk} 
                   AND place_pk=${place_pk}`;

    const result = await db.query(query);

    return result ? true : false;
}

exports.deleteLikeCollection = async (user_pk, collection_pk) => {
    const query = `DELETE FROM like_collection 
                   WHERE user_pk=${user_pk} 
                   AND collection_pk=${collection_pk}`;

    const result = await db.query(query);

    return result ? true : false;
}