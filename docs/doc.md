Firebase and AngularJS Workshop
===========================

The Database Schema
--------------------------

###Example of a Firebase schema
```javascript
{
    "posts": {
        "-Jy6eaXh2kNkiuvNLR8q": {
            "comments": {
                "-Jy6ecytE5ZepO_gcfhr": {
                    "text": "esto es un comentario",
                    "username": "user2"
                },
                "-Jy6egRNVquQ-XJu4j-E": {
                    "text": "esto es otro comentario",
                    "username": "user2"
                }
            },
            "dislikes": 20,
            "image": "",
            "likes": 100,
            "text": "Esto es un post",
            "username": "user2"
        },
        "-Jy6fRwbKi1AkLRUXGT1": {
            "comments": {
                "-Jy6fX1sfUX37T5DjQma": {
                    "text": "jajaja see",
                    "username": "leon"
                }
            },
            "dislikes": 4,
            "image": "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKD…p7d4CQcnBx06fX0rWt/ls4NvHC0upqPticfeC59+KpaOxF7mEHYDHy/nRTpUXzW4HWirA//9k=",
            "likes": 0,
            "text": "un comentario con un meme",
            "username": "user2"
        }
    },
    "users": {
        "-Jy6eYBMzp6w2E8BYhEJ": {
            "dislikes": {
                "-Jy6fBH1GQ3oduzLe8zI": {
                    "postId": "-Jy6eyrB5AJv-j4hAJaT"
                },
                "-Jy6jykww4Zzct6ZDvYR": {
                    "postId": "-Jy6jV8GwsCfEqFk1ane"
                }
            },
            "likes": {
                "-Jy6eb2DU1KnT7_V1S4t": {
                    "postId": "-Jy6eaXh2kNkiuvNLR8q"
                }
            },
            "name": "user1"
        },
        "-Jy6eZZ3oiZC9PcDODpx": {
            "likes": {
                "-Jy6ewdAanTZaztO5LL2": {
                    "postId": "-Jy6euD7XXzci1nonxHV"
                },
                "-Jy6fsoWNFXsjS6Jw2Zs": {
                    "postId": "-Jy6fdSp0Fs9Pf5ejsa5"
                },
                "-Jy6rh8c4E_aT1w_DSWN": {
                    "postId": "-Jy6qXR73MRhCzIqTBHE"
                }
            },
            "name": "user2"
        }
    }
}
```

An account? *(create accounts)*
--------------
### Items


I have a funny idea!, the world should know it *(create posts)*
------------------------------------------------------
### Items



I like/disgust this Post! *(create post's votes)*
---------------------------
### Items

Well, I need to say something about this Post *(create comments)*
------------------------------------------------------
### Items

Who is connected now? *(Show connected users)*
----------------------------
### Items

Oh! a new post appear *(post realtime updating)*
---------------------------
### Items
- `Child added`
- `dsa`
- `dsda`

I need more *(queries)*
-------------------
