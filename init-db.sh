#!/bin/bash
# Update pg_hba.conf to use trust authentication for local connections
sed -i 's/^local.*all.*all.*md5$/local   all             all                                     trust/' "$PGDATA/pg_hba.conf"
sed -i 's/^host.*all.*all.*127.0.0.1.*md5$/host    all             all             127.0.0.1\/32            md5/' "$PGDATA/pg_hba.conf"
