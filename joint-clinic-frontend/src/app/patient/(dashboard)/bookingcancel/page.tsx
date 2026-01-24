import { Suspense } from "react";
import BookingsClient from "./BookingsClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading booking cancellation...</div>}>
      <BookingsClient />
    </Suspense>
  );
}
