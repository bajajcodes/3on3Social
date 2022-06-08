import { Post } from "./Post";
import { ModalBackground } from "../modalBackground/ModalBackground";
import { Loader } from "components";
import { closeModal } from "features";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

function PostModal() {
  const { display, show } = useSelector((state) => state.postModal);
  const status = useSelector((state) => state.post.status);
  const dispatch = useDispatch();
  const isPostModalOpened = useRef(false);

  useEffect(() => {
    if (!show) {
      isPostModalOpened.current = false;
      dispatchCloseModal();
    }
  }, [show]);

  function dispatchCloseModal() {
    dispatch(closeModal());
  }

  function editPostModalOpened() {
    isPostModalOpened.current = true;
  }

  return (
    <>
      <ModalBackground display={display} closeModal={dispatchCloseModal} />
      {isPostModalOpened.current === false && (
        <Post editPostModalOpened={editPostModalOpened} />
      )}
      {status === "updating" && <Loader message={"Updating..."} />}
    </>
  );
}
export { PostModal };
