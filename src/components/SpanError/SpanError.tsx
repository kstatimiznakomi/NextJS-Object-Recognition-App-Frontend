interface SpanError {
  error: string | undefined;
}

export const SpanError: React.FC<SpanError> = ({ error }) => {
  return (
    <span
      className={
        "text-white text-center bg-red-500/75 p-3 mt-2 select-none rounded-l"
      }
    >
      {error}
    </span>
  );
};
