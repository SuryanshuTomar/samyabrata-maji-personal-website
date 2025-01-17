const query = `query {
    user(username: "samyabratamaji") {
      publication {
        posts(page:0) {
          title
          contentMarkdown
          coverImage
        }
      }
    }
  }`;

export const getBlogs = async () => {
  return fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((req) => {
      if (req.ok) return req.json();
    })
    .then((data) => {
      return data.data.user.publication.posts
        .slice(0, 4)
        .map(
          (post: {
            contentMarkdown: string;
            coverImage: string;
            title: string;
          }) => {
            post.coverImage = `${post.coverImage}?fit=crop&crop=entropy&auto=compress,format&format=webp`;
            return post;
          }
        );
    });
};
