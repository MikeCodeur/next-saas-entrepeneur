import {NextRequest, NextResponse} from 'next/server'

// 🐶 Exporte les handlers GET et POST de @/services/authentication/auth-service

// export {GET, POST} from '@/services/authentication/auth-service'

export async function GET() {
  return NextResponse.json({message: 'Next Auth API handler Not implemented'})
}

export async function POST(request: NextRequest) {
  return NextResponse.json({message: 'Next Auth API handler Not implemented'})
}
