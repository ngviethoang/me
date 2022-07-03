import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import { getTagBySlug } from '../../lib/api';
import PostTitle from '../../components/post/title';
import TagType from '../../types/tag';
import MoreStories from '../../components/more-stories';

type Props = {
  tag: TagType;
};

const Post = ({ tag }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !tag?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <MoreStories posts={tag.posts} title={tag.name} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getServerSideProps({ params }: Params) {
  const tag = await getTagBySlug(params.slug);

  return {
    props: {
      tag: {
        ...tag,
      },
    },
  };
}
