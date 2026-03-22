#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};

#[test]
fn test_create_poll() {
    let env = Env::default();
    let contract_id = env.register(SimplePoll, ());
    let client = SimplePollClient::new(&env, &contract_id);

    let question = String::from_str(&env, "What's your favorite color?");
    let options = vec![
        &env,
        String::from_str(&env, "Red"),
        String::from_str(&env, "Blue"),
        String::from_str(&env, "Green"),
    ];

    let poll_id = client.create_poll(&question, &options);
    assert_eq!(poll_id, 0);

    let results = client.get_results(&poll_id);
    assert_eq!(results.question, question);
    assert_eq!(results.options, options);
}

#[test]
fn test_vote() {
    let env = Env::default();
    let contract_id = env.register(SimplePoll, ());
    let client = SimplePollClient::new(&env, &contract_id);

    let question = String::from_str(&env, "What's your favorite color?");
    let options = vec![
        &env,
        String::from_str(&env, "Red"),
        String::from_str(&env, "Blue"),
    ];

    let poll_id = client.create_poll(&question, &options);

    // Vote for option 0 (Red)
    client.vote(&poll_id, &0);

    let results = client.get_results(&poll_id);
    assert_eq!(results.votes.get(0).unwrap(), 1);
    assert_eq!(results.votes.get(1).unwrap_or(0), 0);
}

#[test]
fn test_multiple_votes() {
    let env = Env::default();
    let contract_id = env.register(SimplePoll, ());
    let client = SimplePollClient::new(&env, &contract_id);

    let question = String::from_str(&env, "Best fruit?");
    let options = vec![
        &env,
        String::from_str(&env, "Apple"),
        String::from_str(&env, "Banana"),
    ];

    let poll_id = client.create_poll(&question, &options);

    client.vote(&poll_id, &0); // Apple
    client.vote(&poll_id, &1); // Banana
    client.vote(&poll_id, &0); // Apple again

    let results = client.get_results(&poll_id);
    assert_eq!(results.votes.get(0).unwrap(), 2); // Apple: 2 votes
    assert_eq!(results.votes.get(1).unwrap(), 1); // Banana: 1 vote
}

#[test]
fn test_invalid_option() {
    let env = Env::default();
    let contract_id = env.register(SimplePoll, ());
    let client = SimplePollClient::new(&env, &contract_id);

    let question = String::from_str(&env, "Test?");
    let options = vec![&env, String::from_str(&env, "Yes")];

    let poll_id = client.create_poll(&question, &options);

    // This should panic
    let result = std::panic::catch_unwind(|| {
        client.vote(&poll_id, &5); // Invalid option
    });
    assert!(result.is_err());
}
