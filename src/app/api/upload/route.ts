import { NextRequest, NextResponse } from 'next/server';

const GPU_BACKEND = "https://jibrilmwaingo--triptsg-modal-2-entrypoint.modal.run";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const response = await fetch(`${GPU_BACKEND}/upload`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    return new NextResponse(await response.text(), { status: response.status });
  }

  const blob = await response.blob();
  return new NextResponse(blob, {
    status: 200,
    headers: {
      'Content-Type': 'application/sla',
      'Content-Disposition': 'attachment; filename=model.stl',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
