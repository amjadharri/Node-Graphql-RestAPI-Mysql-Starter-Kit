import _ from "lodash";
import {userModel} from "./../../database/database.js";

import Faker from "faker";

export default function () {
	_.times(10, () => {
		return userModel.create({
			username: Faker.name.firstName(),
			email: Faker.internet.email(),
			password: Faker.name.lastName()
		})
	})
}