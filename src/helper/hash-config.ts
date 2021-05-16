import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { isNilOrEmpty } from 'ramda-adjunct'
import { Repository } from 'typeorm'

import config from '../config';
import { User } from '../api/user/user.entity'

const createHash = async (password: string) => bcrypt.hash(password, 10)
const comparePassword = async (password: string, hashPassword: string) => bcrypt.compare(password, hashPassword)
const getToken = (id: number) => jwt.sign({ id }, config.token.secret_key, { expiresIn: `${30 * 24}h` })

const validateUserId = (userRepository: Repository<User>) => async (decoded, request) => {
    if (isNilOrEmpty(decoded)) return { isValid: false }
    const res = await userRepository.findOne({ where: { id: decoded.id } })
  
    if (isNilOrEmpty(res)) {
      return { isValid: false }
    }
    return { isValid: true }
}


export { createHash, comparePassword, getToken, validateUserId}