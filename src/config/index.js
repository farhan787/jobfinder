export const baseUrl = process.env.REACT_APP_API_BASE_URL;

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
