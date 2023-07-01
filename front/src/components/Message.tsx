const Message = ({ message }: { message: any }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div
          className={`alert ${
            message.error ? "alert-danger" : "alert-success"
          }`}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
