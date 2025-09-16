export function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">buttons</span>
            <span className="word">forms</span>
            <span className="word">cards</span>
            <span className="word">hooks</span>
            <span className="word">components</span>
            <span className="word">services</span>
          </div>
        </div>
      </div>
    </div>
  );
}
