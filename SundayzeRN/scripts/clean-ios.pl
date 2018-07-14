#!/usr/bin/perl
use strict;
use warnings;

use IPC::Run3 qw(run3);

my @all_files;
run3 ['find', 'ios', -type => 'f'], undef, \@all_files;
chomp @all_files;
my %unique_files;
$unique_files{$_} = 1 foreach @all_files;

my @git_files;
run3 ['git', 'ls-files', 'ios'], undef, \@git_files;
chomp @git_files;

delete $unique_files{$_} foreach @git_files;

my @untracked_files = sort +keys %unique_files;

unlink @untracked_files;

printf "Deleted %i files in ios/\n", scalar(@untracked_files);

