# Quiz reference matching
- [x] Match the quiz entrance, name field, spacing, and reward wording to the reference.
- [x] Verify the complete quiz and offer handoff on desktop and mobile.

# Mundpay checkout setup
- [x] Insert the six supplied checkout links and add mapping tests.
- [x] Verify checkout redirects with campaign parameters.
- [ ] Configure the 7 Holy Seals checkout — waiting for its link from the user.
# Mundpay purchase seal
- [x] Install the supplied seal globally and in standalone quiz entries without iframe duplication.
- [x] Verify seal, support modal, and legal links on desktop and mobile.

# Mundpay sales webhook
- [x] Replace the unconfirmed orders API requirement with authenticated postback processing and validation.
- [x] Test authorized and unauthorized delivery paths (mocked services); confirm the live endpoint fails closed before activation.
- [ ] Activate real delivery — waiting for the shared secret to be saved and added to the Mundpay postback URL, then publication and a real payment test.
