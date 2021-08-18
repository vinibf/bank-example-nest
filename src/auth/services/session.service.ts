import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionService {
  private sessions: string[] = []

  add(username: string) {
    if (this.exists(username)) return
    this.sessions.push(username)
  }

  remove(username: string) {
    if (!this.exists(username)) return
    var index = this.sessions.findIndex((session) => session == username)
    this.sessions.splice(index, 1)
  }

  exists(username: string): boolean {
    return this.sessions.some((session) => session == username)
  }
}
