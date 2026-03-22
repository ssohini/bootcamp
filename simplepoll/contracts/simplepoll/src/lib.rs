#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, map, Env, Map, String, Vec};

#[contract]
pub struct SimplePoll;

#[contractimpl]
impl SimplePoll {
    /// Create a new poll with a question and options
    pub fn create_poll(env: Env, question: String, options: Vec<String>) -> u32 {
        // Get the current poll count
        let mut poll_count: u32 = env.storage().instance().get(&"poll_count").unwrap_or(0);

        // Create the poll
        let poll = Poll {
            question,
            options,
            votes: map![&env],
        };

        // Store the poll
        env.storage().instance().set(&poll_count, &poll);

        // Increment and store the count
        poll_count += 1;
        env.storage().instance().set(&"poll_count", &poll_count);

        poll_count - 1 // Return the poll ID
    }

    /// Vote on a poll
    pub fn vote(env: Env, poll_id: u32, option_index: u32) {
        // Get the poll
        let mut poll: Poll = env.storage().instance().get(&poll_id).unwrap();

        // Check if option exists
        if option_index >= poll.options.len() {
            panic!("Invalid option index");
        }

        // Increment vote count
        let current_votes = poll.votes.get(option_index).unwrap_or(0);
        poll.votes.set(option_index, current_votes + 1);

        // Store updated poll
        env.storage().instance().set(&poll_id, &poll);
    }

    /// Get poll results
    pub fn get_results(env: Env, poll_id: u32) -> Poll {
        env.storage().instance().get(&poll_id).unwrap()
    }

    /// Get all poll IDs
    pub fn get_poll_count(env: Env) -> u32 {
        env.storage().instance().get(&"poll_count").unwrap_or(0)
    }
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Poll {
    pub question: String,
    pub options: Vec<String>,
    pub votes: Map<u32, u32>,
}

mod test;
