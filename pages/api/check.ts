import nextConnect from "next-connect";
import axios from "axios";
import clientPromise from "../../lib/database";
import { NextApiRequest, NextApiResponse } from "next";

const cacheTime = process.env.cacheTime || 60000;

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db("MojangStatus");

  db.collection("cache")
    .findOne()
    .then((cached) => {
      if (cached === null) {
        axios
          .get("https://status.mojang.com/check")
          .then((response) => {
            db.collection("cache")
              .insertOne({
                timestamp: Date.now(),
                status: JSON.parse(
                  JSON.stringify(response.data).replace(/\./g, "+")
                ),
              })
              .then(() => {
                // Fresh data, saving to cache...
                res.status(200).json(response.data);
              })
              .catch((e) => {
                if (!e.acknowledged || e.acknowledged !== true) {
                  console.log(e);
                  res.status(500).json({
                    error: {
                      message:
                        "Could not save status in cached DB. Please report this to the developer ASAP.",
                    },
                  });
                }
              });
          })
          .catch((e) => {
            res.status(500).json({
              error: {
                message:
                  "Could not fetch either cached or fresh Mojang data. Please report this to the developer ASAP.",
              },
            });
          });
      } else if (Date.now() - cached.timestamp >= cacheTime) {
        axios
          .get("https://status.mojang.com/check")
          .then((response) => {
            db.collection("cache")
              .updateOne(
                { _id: cached._id },
                {
                  $set: {
                    timestamp: Date.now(),
                    status: JSON.parse(
                      JSON.stringify(response.data).replace(/\./g, "+")
                    ),
                  },
                }
              )
              .then(() => {
                // Stale data, updating cache...
                res.status(200).json(response.data);
              })
              .catch((e) => {
                if (!e.acknowledged || e.acknowledged !== true) {
                  console.log(e);
                  res.status(500).json({
                    error: {
                      message:
                        "Could not save status in cached DB. Please report this to the developer ASAP.",
                    },
                  });
                }
              });
          })
          .catch((e) => {
            // No data from Mojang, serving cache...
            res
              .status(200)
              .json(
                JSON.parse(JSON.stringify(cached.status).replace(/\+/g, "."))
              );
          });
      } else if (Date.now() - cached.timestamp < cacheTime) {
        // Cache still valid, serving cache...
        res
          .status(200)
          .json(JSON.parse(JSON.stringify(cached.status).replace(/\+/g, ".")));
      }
    });
});

export default handler;
