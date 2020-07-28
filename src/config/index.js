export const baseUrl = 'http://localhost:5000/api/v1';

export const users = {
	admin: {
		type: 'admin',
		role: 1,
	},
	candidate: {
		type: 'candidate',
		role: 3,
	},
	recruiter: {
		type: 'recruiter',
		role: 2,
	},
};

export const passwordMinLength = 6;
